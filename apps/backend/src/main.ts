import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  // Use the environment variable for the port, or default to 3001
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log('Server is running at:' + url);
}
bootstrap();
