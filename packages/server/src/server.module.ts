import { Module } from '@nestjs/common';
import { EmailTemplateController } from './email-template/email-template.controller';

@Module({
  controllers: [EmailTemplateController],
  providers: [],
  exports: [],
})
export class EtmServerModule {}
