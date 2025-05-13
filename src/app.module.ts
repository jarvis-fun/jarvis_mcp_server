import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { McpModule } from './core/mcp/mcp.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from './utils/exception.handler';
@Module({
  imports: [McpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {}
