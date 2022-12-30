import { compile } from '@cdgstudio/etm-builder';

export async function compileEmailTemplates(): Promise<void> {
  return await compile();
}
