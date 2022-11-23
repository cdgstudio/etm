#!/usr/bin/env node

import { Controller, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiTags, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EmailTemplateEndpoints } from './email-template/dynamic-path.decorator';

@EmailTemplateEndpoints()
@Controller('templates')
@ApiTags('Templates')
export class EmailTemplateController {}

@Module({
  controllers: [EmailTemplateController],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
