import { build } from 'esbuild';
import { writeFile, access, mkdir } from 'fs/promises';
import path from 'path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { getBuildedListForFiles, getBuildedListOfFiles } from './utils';
import juice from 'juice';

export async function run() {
  const files = await getBuildedListForFiles();

  await build({
    entryPoints: files,
    bundle: true,
    platform: 'node',
    outdir: './.cache/templates',
    external: ['react', 'react-dom', 'styled-components'],
  });

  for (const file of await getBuildedListOfFiles()) {
    const fileName = path.basename(file);
    const noExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const htmlFileName = noExt + '.html';

    const importedFile = await import(file);

    if ('default' in importedFile === false) {
      throw new Error(`File "${file}" does not have default export.`);
    }

    const css = new ServerStyleSheet();
    const html = renderToStaticMarkup(
      css.collectStyles(createElement(importedFile.default))
    );
    const style = css.getStyleTags();
    const htmlWithStyles = html.replace('</head>', `${style}</head>`);
    const inlineCss = juice(htmlWithStyles);

    try {
      await access('./dist');
    } catch {
      await mkdir('dist');
    }

    await writeFile(`./dist/${htmlFileName}`, inlineCss);
  }
}
