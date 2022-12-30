import { program } from 'commander';
import { compileEmailTemplates } from './commands/compile';
import { createNewProject } from './commands/new';

program
  .command('new <projectName>')
  .description('Create a new project to create emails')
  .action(createNewProject);

program
  .command('compile')
  .description('Compile email templates')
  .action(compileEmailTemplates);

program.parse();
