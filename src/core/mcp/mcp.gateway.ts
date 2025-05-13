import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { McpService } from './mcp.service';
import { WsRequest, WsResponse } from '../../utils/type';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { getDtoForMethod } from '../../utils/dto.mapper';
import { HttpException, HttpStatus } from '@nestjs/common';
import { toolCallbacks, toolMetadata } from '../tools/tools';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class McpGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly mcpService: McpService) {}

  @SubscribeMessage('list-tools')
  async handleListTools(
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    // Get the McpServer instance from the service to access tool definitions
    const toolsInfo = Array.from(toolMetadata.entries()).map(
      ([name, metadata]) => ({
        name,
        description: metadata.description,
        parameters: metadata.inputSchema,
      }),
    );
    // console.log('toolsInfo', toolsInfo);
    return {
      success: true,
      data: toolsInfo,
    };
  }

  @SubscribeMessage('jarvis-mcp-server')
  async handleMethodCall(
    @MessageBody() data: WsRequest,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    try {
      console.log(`Received call: ${JSON.stringify(data)}`);

      // Mark the request as WebSocket
      data.isWebSocket = true;

      // Validate the request
      const validation = await this.validateRequest(data);
      if (!validation.isValid) {
        client.emit('mcp-server-response', validation.error);
        return validation.error;
      }

      const toolExists = toolCallbacks.has(data.method);
      if (!toolExists) {
        const fallbackResponse = {
          success: true,
          data: {
            content: [
              {
                type: 'text',
                text: `Only supported tools are: ${toolCallbacks.keys()}`,
              },
            ],
          },
        };
        return fallbackResponse;
      }

      const result = await this.mcpService.callTool(
        data.method,
        validation.result,
      );
      const response = {
        success: true,
        data: result,
      };

      return response;
    } catch (error) {

      const errorResponse = this.formatError(
        error instanceof Error ? error.message : 'Internal server error',
      );

      // Send error through both channels
      client.emit('mcp-server-response', errorResponse);
      return errorResponse;
    }
  }

  @SubscribeMessage('health')
  async handleHealthCheck(
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    return {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString()
      }
    };
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    
    // Send available tools on connection
    const toolsInfo = Array.from(toolMetadata.entries()).map(
      ([name, metadata]) => ({
        name,
        description: metadata.description,
        parameters: metadata.inputSchema,
      }),
    );
    
    try {
      client.emit('available-tools', toolsInfo);
    } catch (error) {
      console.error('Error sending tools info:', error);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  handleError(client: Socket, error: Error) {
    client.emit('error', {
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }

  private formatError(message: string, details: string[] = []): WsResponse {
    return {
      success: false,
      error: {
        message,
        details,
      },
    };
  }

  private async validateRequest(
    data: WsRequest,
  ): Promise<{ isValid: boolean; result: any; error?: WsResponse }> {
    try {
      // Get the DTO class for the method
      const DtoClass = getDtoForMethod(data.method);
      console.log('Found DTO class:', DtoClass?.name);

      let validatedParams = {};
      if (DtoClass && data.params) {
        // Transform and validate the params using the corresponding DTO
        const dtoObject = plainToClass(DtoClass, data.params, {
          enableImplicitConversion: false,
        });

        console.log('Transformed object:', dtoObject);

        const errors = await validate(dtoObject, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
          const messages = errors.map(
            (error) =>
              `${error.property}: ${Object.values(error.constraints).join(', ')}`,
          );
          console.log('Validation errors:', messages);

          // For HTTP requests, throw an HttpException
          if (!data.isWebSocket) {
            throw new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Validation failed',
                errors: messages,
              },
              HttpStatus.BAD_REQUEST,
            );
          }

          return {
            isValid: false,
            result: null,
            error: this.formatError('Validation failed', messages),
          };
        }

        validatedParams = dtoObject;
      } else {
        validatedParams = data.params || {};
      }

      return {
        isValid: true,
        result: validatedParams,
      };
    } catch (error) {
      console.error('Validation error:', error);

      // If it's already an HttpException, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }

      // For HTTP requests, throw an HttpException
      if (!data.isWebSocket) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message:
              error instanceof Error ? error.message : 'Validation error',
            errors: [],
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        isValid: false,
        result: null,
        error: this.formatError(
          error instanceof Error ? error.message : 'Validation error',
        ),
      };
    }
  }
}
