'use strict'
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const download = require('download-git-repo');
const { logWithSpinner, stopSpinner } = require('./utils/spinner');
const { error } = require('./utils/logger');
const templates = require('../templates.json');

let clone = '';
// 操作命令行
async function init(projectName, options) {
  clone = options.clone || false;
  const cwd = options.cwd || process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  // const result = validateProjectName(name)
  // if (!result.validForNewPackages) {
  //   console.error(chalk.red(`Invalid project name: "${name}"`))
  //   result.errors && result.errors.forEach(err => {
  //     console.error(chalk.red(err))
  //   })
  //   process.exit(1)
  // }
  
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
          }
        ])
        if (!ok) {
          return
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
          await fs.remove(targetDir)
        }
      }
    }
  }
  if (options.preset) {
    if (!templates[options.preset]) {
      error(`The template: ${options.preset} dose not found in saved templates!`);
      process.exit();
    } else {
      downloadAndGenerate(options.preset, targetDir);
    }
  } else {
    run(targetDir);
  }
}
async function run(targetDir) {
  const choices = [];
  for (let key in templates) {
    choices.push(
      {name: `${key}`, value: key}
    );
  }
  const { template } = await inquirer.prompt([
    {
      name: 'template',
      type: 'list',
      message: `Please choose a template: `,
      choices: choices,
      pageSize: 8
    }
  ])
  downloadAndGenerate(template, targetDir);
}

async function downloadAndGenerate(template, targetDir) {
  const branch = templates[template].branch;
  const repo = `${templates[template].owner}/${templates[template].repo}#${branch}`;
  logWithSpinner('downloading template');

  try {
    download(repo, targetDir, {clone}, err => {
      stopSpinner();
      if (err) error('Failed to download repo ' + repo + ': ' + err.message.trim())
    })
  } catch(err) {
    stopSpinner();
  }
  
}
module.exports = (...args) => {
  return init(...args).catch(err => {
    error(err)
    process.exit(1)
  })
}