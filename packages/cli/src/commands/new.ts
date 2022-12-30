import ora from 'ora';
import path from 'path';
import { installPackages } from '../package-managers/npm';
import { createDirectoryContents } from './utils';

export async function createNewProject(projectName: string): Promise<void> {
  const spinner = ora();

  const currentDir = process.cwd();
  const output = path.join(currentDir, projectName);

  spinner.start('Creating new repository');
  console.log(
    __dirname
  )
  process.exit(222);
  await createDirectoryContents({
    inputDir: '/home/adrian/MyCurse/etm/packages/cli/src/assets/templates',
    outputDir: output,
    data: {
      projectName,
    },
  });

  spinner.start('Installing packages via npm');
  await installPackages({ cwd: output }).catch(console.warn);

  spinner.stop();
}
