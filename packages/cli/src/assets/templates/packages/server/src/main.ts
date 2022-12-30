import { EmailController } from '@cdgstudio/etm-server';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiTags, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

@ApiTags('Emails')
@EmailController({
  pathToTemplates: join(__dirname, '..', 'emails', 'templates'),
  path: 'emails',
})
class MyController {}

@Module({
  imports: [],
  controllers: [MyController],
  providers: [],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Email templates manager')
    .setDescription('Create beautiful email with NestJs and React')
    .setVersion('1.0.0')
    .setLicense('MIT', 'https://github.com/cdgstudio/etm/blob/master/LICENCE')
    .setContact('CodeGen Studio', 'https://github.com/cdgstudio', '')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
