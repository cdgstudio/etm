import { readdirSync } from 'fs';
import { generateTemplate } from '@cdgstudio/etm-builder';
import { Body, Post } from '@nestjs/common';
import path from 'path';

export interface DecoratorParams {
  pathToTemplates?: string;
}

export function EmailTemplateEndpoints({
  pathToTemplates,
}: DecoratorParams = {}): ClassDecorator {
  const defaultPath = pathToTemplates ?? getDefaultPath();

  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    const fileNames = readdirSync(defaultPath);
    fileNames
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => path.join(defaultPath, fileName))
      .forEach((filePath) => createEndpoint(constructor, filePath));
  };
}

function getDefaultPath(fullPath?: string): string {
  if (fullPath !== undefined) {
    return fullPath;
  }

  if (process.env.PWD !== undefined) {
    return path.join(process.env.PWD, '.cache/templates');
  }

  throw new Error(`PWD env is undefined. Did you run script with node?`);
}

function createEndpoint(
  // eslint-disable-next-line @typescript-eslint/ban-types
  controller: Function,
  filePath: string
) {
  const { Params, template } = importFile(filePath);

  const prototype = controller.prototype;
  prototype[filePath] = generateTemplateFunction(filePath, template);

  if (Params) {
    Reflect.defineMetadata('design:paramtypes', [Params], prototype, filePath);

    const body = Body();
    body(prototype, filePath, 0);
  }

  const post = Post('/' + path.basename(filePath));
  post({}, filePath, {
    value: prototype[filePath],
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

function importFile(path: string): { template: string; Params?: unknown } {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const importedFile = require(path);

  if ('default' in importedFile === false) {
    throw new Error(`File ${path} must have default export`);
  }

  if ('Params' in importedFile === false) {
    console.warn(`File ${path} does not have params`);
  }

  return {
    Params: importedFile.Params,
    template: importedFile.default,
  };
}

function generateTemplateFunction(fileName: string, template: string) {
  return {
    [fileName]: async (body: any) => {
      return generateTemplate(template, body);
    },
  }[fileName];
}
