import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplateController } from './email-template.controller';

describe('EmailTemplateController', () => {
  let controller: EmailTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailTemplateController],
    }).compile();

    controller = module.get<EmailTemplateController>(EmailTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
