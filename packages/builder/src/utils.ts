import { access } from 'fs/promises';
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

export async function getFilesToBuild(): Promise<string[]> {
  const root = getTemplateRootPath();
  const search = promisify(g);

  return await search(`${root}/**/*.tsx`);
}

export async function getBuildedListOfFiles(): Promise<string[]> {
  const root = path.join(getRootPath());
  const search = promisify(g);

  return await search(`${root}/.cache/templates/**/*.js`);
}

export async function getTsConfigPath(): Promise<string> {
  try {
    const root = getRootPath();
    const fullPath = path.join(root, 'tsconfig.json');
    await access(fullPath);
    return fullPath;
  } catch {
    throw new Error(`tsconfig.json not found.`);
  }
}
