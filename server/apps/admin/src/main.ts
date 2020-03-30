import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const options = new DocumentBuilder()
  .setTitle('video-full-stack后端api接口')
  .setDescription('服务端接口')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3300);
  console.log('http://localhost:3300/api-docs')
}
bootstrap();
