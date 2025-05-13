import { Module } from '@nestjs/common';
import { McpService } from './mcp.service';
import { McpGateway } from './mcp.gateway';

@Module({
  providers: [McpService, McpGateway],
  exports: [McpService],
})
export class McpModule {}
