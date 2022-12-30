import { generateTemplate } from '@cdgstudio/etm-builder';
import {
  applyDecorators,
  Body,
  Controller,
  ControllerOptions,
  Post,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { readdirSync } from 'fs';
import * as path from 'path';
import { EmailTemplateProperties } from './email.models';
import { classFactory } from './factories';
import { getApiPropertyOptions } from './prop-types-to-swagger';

export interface EmailControllerOptions extends ControllerOptions {
  pathToTemplates: string;
}

export function EmailController(params: EmailControllerOptions) {
  return applyDecorators(
    Controller(params),
    AddEmailTemplateEndpoints(params.pathToTemplates)
  );
}

function AddEmailTemplateEndpoints(pathToTemplates: string): ClassDecorator {
  const defaultPath = pathToTemplates ?? getDefaultPath();

  return function (constructor: CallableFunction) {
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

function createEndpoint(controller: CallableFunction, filePath: string) {
  const fileName = path.parse(filePath).name;
  const defaultElement = importFile(filePath);

  const prototype = controller.prototype;
  prototype[fileName] = generateTemplateFunction(fileName, defaultElement);

  if (defaultElement.propTypes) {
    const Params = classFactory(fileName);
    addDecorators(Params, defaultElement);
    Reflect.defineMetadata('design:paramtypes', [Params], prototype, fileName);

    const body = Body();
    body(prototype, fileName, 0);
  }

  const post = Post('/' + fileName);
  post({}, filePath, {
    value: prototype[fileName],
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

// @todo: add types
function addDecorators(where: ClassConstructor<unknown>, element: any) {
  for (const key of Object.keys(element.propTypes)) {
    const types = getApiPropertyOptions(element, key);
    if (types === null) {
      continue;
    }
    const dec = ApiProperty(types);
    dec(where.prototype, key);
  }
}

function importFile(path: string): EmailTemplateProperties {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const importedFile = require(path);

  if ('default' in importedFile === false) {
    throw new Error(`File ${path} must have default export`);
  }

  return importedFile.default;
}

function generateTemplateFunction(functionName: string, template: any) {
  return {
    [functionName]: async (body: any) => {
      return generateTemplate(template, body);
    },
  }[functionName];
}
