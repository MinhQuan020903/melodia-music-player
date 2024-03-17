import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  console.log(
    'Server is running on port:' + process.env.NEXT_PUBLIC_BACKEND_PORT,
  );
  console.log('supabase url: ' + process.env.NEXT_PUBLIC_SUPABASE_URL);
  await app.listen(process.env.NEXT_PUBLIC_BACKEND_PORT || 3001);
}
bootstrap();
