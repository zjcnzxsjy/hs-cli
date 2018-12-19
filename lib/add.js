'use strict';
const inquirer = require('inquirer');
const fs = require('fs');
//const { getVersion } = require('./utils/get-info');
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
  
  const {repo} = await inquirer.prompt(
    {
      name: 'repo',
      type: 'input',
      message: 'Please input a template-name:',
      validate(anwser) {
        if (existTemplate(anwser)){
          console.log('\n');
          warn('Template has existed!');
        } else {
          return true;
        }
      }
    }
  );

  const answers = await inquirer.prompt([
    {
      name: 'description',
      type: 'input',
      message: 'Please input the template description: '
    },
    {
      name: 'owner',
      type: 'input',
      message: 'Please input the owner by github: ',
      validate(anwser) {
        if (!anwser){
          console.log('\n');
          warn('Please input a owner name!');
        } else {
          return true;
        }
      }
    },
    {
      name: 'branch',
      type: 'input',
      message: 'Please input the branch: ',
      validate(anwser) {
        if (!anwser){
          console.log('\n');
          warn('Please input a branch name!');
        } else {
          return true;
        }
      }
    }
  ])

  const options = Object.assign({}, {repo}, answers);
  // const {version} = await getVersion(answers.owner, repo);
  // options.version = version;
  tpls[repo] = options;
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

