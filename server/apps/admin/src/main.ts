import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })

  const options = new DocumentBuilder()
  .setTitle('video-full-stack后端api接口')
  .setDescription('服务端接口')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3300
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
