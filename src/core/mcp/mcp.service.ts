import { Injectable } from '@nestjs/common';
import { toolCallbacks, toolMetadata } from '../tools/tools';
import { mcpServer, initializeServer } from '../../server/server';

@Injectable()
export class McpService {
  constructor() {}

  async callTool(toolName: string, args: any): Promise<any> {
    try {
      // Ensure server is initialized
      if (!mcpServer) {
        await initializeServer();
      }

      // Get the tool callback
      const toolCallback = toolCallbacks.get(toolName);
      if (!toolCallback) {
        return {
          content: [
            {
              type: 'text',
              text: 'The requested operation is currently unavailable. Please try again later.',
            },
          ],
        };
      }

      // Execute the callback with the provided arguments
      const result = await toolCallback(args);
      return result;
    } catch (error) {
      console.error(`Error calling tool ${toolName}:`, error);
      return {
        content: [
          {
            type: 'text',
            text: 'The service is temporarily unavailable. Please try again later.',
          },
        ],
      };
    }
  }

  async getToolsInfo() {
    return Array.from(toolMetadata.entries()).map(([name, metadata]) => ({
      name,
      description: metadata.description,
      input_schema: metadata.inputSchema,
    }));
  }
}
