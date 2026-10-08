import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const logger = app.get(AppLogger);

  // app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({whitelist: true,forbidNonWhitelisted: true,transform: true}))

  app.useGlobalFilters(new HttpExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('Talabat Backend API')
    .setDescription('Talabat E-Commerce Backend API')
    .setVersion('1.0')
    .addBearerAuth({type: 'http',scheme: 'bearer',bearerFormat: 'JWT'},'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port);

  // logger.log(`Talabat API is running on port ${port}`);
}

bootstrap();