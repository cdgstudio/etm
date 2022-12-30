import { access, mkdir, readdir, stat, writeFile, readFile } from 'fs/promises';
import path from 'path';
import * as ejs from 'ejs';

interface Input {
  inputDir: string;
  outputDir: string;
  data?: Record<string, string | number | boolean>;
}

export async function createDirectoryContents({
  inputDir,
  outputDir,
  data,
}: Input) {
  try {
    await access(outputDir);
  } catch {
    await mkdir(outputDir);
  }

  const filesToCreate = await readdir(inputDir);

  // todo: parallel creating files
  for (const file of filesToCreate) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    const stats = await stat(inputPath);

    if (stats.isFile()) {
      const content = await readFile(inputPath, 'utf8');
      const parsed = await ejs.render(content, data, { async: true });
      await writeFile(outputPath, parsed, 'utf8');
    } else if (stats.isDirectory()) {
      createDirectoryContents({
        inputDir: inputPath,
        outputDir: outputPath,
        data,
      });
    }
  }
}
