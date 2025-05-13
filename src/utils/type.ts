import { GetTokenPriceDto } from '../dtos/balance.dto';

// Map of method names to their parameter and response types
export interface MethodSignatures {
  getBalance: {
    params: GetTokenPriceDto;
    response: string;
  };
}

// Type for method handlers
export type MethodHandler<P, R> = (params: P) => Promise<R>;

// Type for method handler map
export type MethodHandlers = {
  [M in keyof MethodSignatures]: MethodHandler<
    MethodSignatures[M]['params'],
    MethodSignatures[M]['response']
  >;
};

// Tool Response Types
export type ToolResponse = {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  _meta?: Record<string, unknown>;
  isError?: boolean;
};

// Tool Handler Type
export type ToolHandler = (
  args: Record<string, unknown>,
) => Promise<ToolResponse>;

// WebSocket Message Types
export interface WsRequest {
  method: string;
  params?: any;
  isWebSocket?: boolean;
}

// WebSocket Response Types
export interface WsResponse {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    details: string[];
  };
}
