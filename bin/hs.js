#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');
const packageInfo = require('../package.json');

program
  .version(packageInfo.version)

program
  .command('init <project-name>')
  .description('generate a project from a local or remote template ')
  .option('-p, --preset <templateName>', 'Skip prompts and use saved template')
  .option('-c, --clone', 'use git clone')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    require('../lib/init')(name, options)
  });

program
  .command('add')
  .description('add a new template in saved templates ')
  .action(() => {
    require('../lib/add')()
  });


program
  .command('delete')
  .description('delete a saved template ')
  .option('-t, --template <template-name>', 'Skip prompts and delete saved template')
  .option('-f, --force', 'Sure to delete the template')
  .action((cmd) => {
    const options = cleanArgs(cmd);
    require('../lib/delete')(options);
  });

program
  .command('list')
  .description('list saved templates ')
  .action(() => {
    require('../lib/list')()
  });

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}