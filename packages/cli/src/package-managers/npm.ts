import { spawn } from 'child_process';

export interface Opts {
  cwd: string;
}

export async function installPackages(opts: Opts): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(`npm`, ['install'], {
      cwd: opts.cwd,
      shell: true,
      timeout: 1000000,
    });

    child.on('error', reject);

    child.on('close', (code) => {
      if (code === 0) {
        resolve(void 0);
      } else {
        reject(code);
      }
    });
  });
}
