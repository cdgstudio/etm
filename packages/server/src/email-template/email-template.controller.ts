import { Controller } from '@nestjs/common';
import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { createEndpoint } from './meta-data';

@Controller('templates')
export class EmailTemplateController {
  getTemplate(fileName: string) {
    return {
      [fileName]: async (body: any) => {
        const content = await readFile(
          `/home/adrian/MyCurse/etm/dist/${fileName}`,
          {
            encoding: 'utf-8',
          }
        );
        return {
          content,
        };
      },
    };
  }
}

const files = readdirSync('/home/adrian/MyCurse/etm/dist');
files
  .filter((file) => file.endsWith('.html'))
  .forEach((file) => createEndpoint(EmailTemplateController, file));
