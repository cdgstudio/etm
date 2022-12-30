import juice from 'juice';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import ts from 'typescript';

export async function compile() {
  const currentDir = process.env.PWD || './';
  const configFile = ts.findConfigFile(
    currentDir,
    ts.sys.fileExists,
    'tsconfig.json'
  );

  if (!configFile) throw Error('tsconfig.json not found');

  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  const { options, fileNames, errors } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    currentDir
  );

  const program = ts.createProgram({
    options,
    rootNames: fileNames,
    configFileParsingDiagnostics: errors,
  });

  program.emit();
}

export function generateTemplate(
  ...args: Parameters<typeof createElement>
): string {
  const css = new ServerStyleSheet();
  const html = renderToStaticMarkup(css.collectStyles(createElement(...args)));
  const style = css.getStyleTags();

  const htmlWithStyles = html.includes('</head>')
    ? html.replace('</head>', `${style}</head>`)
    : `${style}${html}`;

  return juice(htmlWithStyles);
}
