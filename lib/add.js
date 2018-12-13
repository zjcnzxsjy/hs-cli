'use strict';
const inquirer = require('inquirer');
const fs = require('fs');
const tpls = require('../templates');
const {
  error,
  warn, 
  done
} = require('./utils/logger');

function existTemplate(name) {
  if(tpls[name]) {
    return true;
  }
  return false;
}

const writeFile = (err) => {
  // 处理错误
  if (err) {
    error(err);
    process.exit();
  }
  done('Add the new templates succeed! ');
  process.exit();
};

async function add() {
  
  const {templateName} = await inquirer.prompt(
    {
      name: 'templateName',
      type: 'input',
      message: 'Please input a template-name:'
    }
  );

  if (existTemplate(templateName)){
    warn('Template has existed!');
    process.exit(1);
  }
  const answers = await inquirer.prompt([
    {
      name: 'description',
      type: 'input',
      message: 'Please input the template description:'
    },
    {
      name: 'repository',
      type: 'input',
      message: 'Clone or download with using repository:'
    },
    {
      name: 'branch',
      type: 'input',
      message: 'Please input the branch:'
    }
  ])

  const options = Object.assign({}, {templateName}, answers);
  
  tpls[templateName] = options;
  // 把模板信息写入templates.json
  try {
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(tpls), 'utf-8',writeFile);
  } catch(err) {
    console.log(err)
  }
  
}
module.exports = () => {
  return add().catch(err => {
    process.exit(1);
  })
};

