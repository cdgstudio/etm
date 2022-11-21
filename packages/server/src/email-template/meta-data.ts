import { Body, Post } from '@nestjs/common';
import { readFile } from 'fs/promises';

function getTemplate(fileName: string) {
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
  }[fileName];
}

export function createEndpoint(
  controller: { new (): unknown },
  filePath: string
) {
  const post = Post('/' + filePath);
  const body = Body();

  const prototype = controller.prototype as any;
  prototype[filePath] = getTemplate(filePath);

  Reflect.defineMetadata(
    'design:paramtypes',
    [String],
    controller.prototype,
    filePath
  );

  body(controller.prototype, filePath, 0);

  post({}, filePath, {
    value: prototype[filePath],
    writable: true,
    enumerable: false,
    configurable: true,
  });
}
