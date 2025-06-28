import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove campos não definidos no DTO
    forbidNonWhitelisted: true, // Lança erro se enviar campos não permitidos
    transform: true, // Converte automaticamente tipos (ex: string para number)
  }))
  app.enableCors({
    origin: '*', // ou ['http://localhost:3001'] para múltiplas
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true, // se estiver usando cookies ou autenticação
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
