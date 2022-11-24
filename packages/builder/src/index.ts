import { build } from 'esbuild';
import juice from 'juice';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { getFilesToBuild, getTsConfigPath } from './utils';

export { getBuildedListOfFiles } from './utils';

export async function run() {
  const files = await getFilesToBuild();
  const tsconfig = await getTsConfigPath();

  await build({
    entryPoints: files,
    bundle: true,
    platform: 'node',
    outdir: './.cache/templates',
    external: ['./node_modules/*'],
    tsconfig: tsconfig,
    write: true,
  });
}

export function generateTemplate(
  ...args: Parameters<typeof createElement>
): string {
  const css = new ServerStyleSheet();
  const html = renderToStaticMarkup(css.collectStyles(createElement(...args)));
  const style = css.getStyleTags();
  const htmlWithStyles = html.replace('</head>', `${style}</head>`);
  return juice(htmlWithStyles);
}
