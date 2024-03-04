import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  console.log('Server is running on port:' + process.env.BACKEND_PORT);
  await app.listen(process.env.BACKEND_PORT || 3001);
}
bootstrap();
