import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerServerTools } from '../core/tools/tools';

// Export types if needed by other parts of the application
export type { McpServer };

export let mcpServer: McpServer | null = null;
let toolsRegistered = false;

export const initializeServer = async () => {
  try {
    // Only create new server if one doesn't exist
    if (!mcpServer) {
      mcpServer = new McpServer({
        name: 'jarvis-mcp-server',
        version: '1.0.0',
      });
    }

    // Register tools only if not already registered
    if (!toolsRegistered) {
      registerServerTools(mcpServer);
      toolsRegistered = true;
      console.log('Jarvis MCP Server tools registered successfully');
    }

    return mcpServer;
  } catch (error) {
    console.error('Error initializing Jarvis MCP Server:', error);
    throw error;
  }
};
