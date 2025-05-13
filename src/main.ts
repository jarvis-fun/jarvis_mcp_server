
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeServer } from './server/server';
import { ValidationPipe } from '@nestjs/common';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    // Initialize and start MCP server
    const server = await initializeServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);

    const port = 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:3000`);
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
}

bootstrap();
