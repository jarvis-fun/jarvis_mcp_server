import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  getLiquidityAddRemoveInPool,
  getMostProfitableTrades,
  getMostTradedToken,
  getTokenPrice,
  getTokenPriceChange,
  getTokenReserve,
  getTradingVolume,
  getWhaleBuySell,
} from './tools-method';

export const toolMetadata: Map<
  string,
  { description: string; inputSchema: any }
> = new Map();

export const toolCallbacks: Map<string, (args: any) => Promise<any>> =
  new Map();

export const registerServerTools = (server: McpServer) => {
  const tools = [
    {
      name: 'getTokenPrice',
      description: 'Get the price of a token and circulating supply',
      schema: { accountId: z.string().describe('The token account address') },
      handler: getTokenPrice,
    },
    {
      name: 'getTokenReserve',
      description: 'Get the reserve and liquidity of a token',
      schema: { accountId: z.string().describe('The token account address') },
      handler: getTokenReserve,
    },
    {
      name: 'getTokenPriceChange',
      description: 'Get the price change of a token in the last 24 hours',
      schema: { accountId: z.string().describe('The token account address') },
      handler: getTokenPriceChange,
    },
    {
      name: 'getLiquidityAddRemoveInPool',
      description: 'Get the liquidity add remove in pool of a token',
      schema: {
        poolAddress: z
          .string()
          .optional()
          .describe('The token account address'),
        limit: z.number().optional().describe('The limit of the data'),
      },
      handler: getLiquidityAddRemoveInPool,
    },
    {
      name: 'getMostTradedToken',
      description: 'Get the most traded token in the last 24 hours',
      schema: {
        limit: z.number().optional().describe('The limit of the data'),
      },
      handler: getMostTradedToken,
    },
    {
      name: 'getWhalesBuySell',
      description: 'Get the whale buy sell of a token',
      schema: {
        accountId: z.string().optional().describe('The token account address'),
        limit: z.number().optional().describe('The limit of the data'),
        timeInterval: z
          .number()
          .optional()
          .describe('The time interval of the data'),
      },
      handler: getWhaleBuySell,
    },
    {
      name: 'getMostProfitableTrades',
      description: 'Get the most profitable trades',
      schema: {
        limit: z.number().optional().describe('The limit of the data'),
      },
      handler: getMostProfitableTrades,
    },
    {
      name: 'getTradingVolume',
      description: 'Get the trading volume of a token',
      schema: {
        limit: z.number().optional().describe('The limit of the data'),
        timeInterval: z
          .number()
          .optional()
          .describe('The time interval of the data'),
      },
      handler: getTradingVolume,
    },
  ];

  for (const tool of tools) {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
    toolMetadata.set(tool.name, {
      description: tool.description,
      inputSchema: tool.schema,
    });

    toolCallbacks.set(tool.name, tool.handler);
  }
};
