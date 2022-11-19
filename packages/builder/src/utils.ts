import g from 'glob';
import path from 'path';
import { promisify } from 'util';
export const glob = promisify(g);

export function getRootPath(): string {
  if (process.env && process.env.PWD) {
    return process.env.PWD;
  }
  throw new Error('Root path not foud');
}

export function getTemplateRootPath() {
  return path.join(getRootPath(), 'templates');
}

export async function getBuildedListForFiles(): Promise<string[]> {
  const root = getTemplateRootPath();
  const search = promisify(g);

  return await search(`${root}/**/*.tsx`);
}

export async function getBuildedListOfFiles(): Promise<string[]> {
  const root = path.join(getRootPath());
  const search = promisify(g);

  return await search(`${root}/.cache/templates/**/*.js`);
}
