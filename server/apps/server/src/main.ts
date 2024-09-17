import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const options = new DocumentBuilder()
  .setTitle('video-full-stackWeb端api接口')
  .setDescription('Web端接口')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3200
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
