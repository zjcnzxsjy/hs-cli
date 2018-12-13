'use strict'
const inquirer = require('inquirer');
const fs = require('fs');
const { done, error, info } = require('./utils/logger')
const templates = require('../templates');
const oriLength = Object.keys(templates).length;

function emptyObject(object) {
    let key = '';
    for (key in object) {
        return false;
    }
    return true;
}

function writeFile(err) {
    if (err) {
        err('请重新运行!');
        process.exit();
    }
    done('Operate success!');
    process.exit();
}

async function del(options) {
    if (options.template) {
        const noSavedTemplates = [];
        const tmps = options.template.split(',');
        for (let i = 0, l = tmps.length; i < l; i++) {
            if (templates[tmps[i]]) {
                delete templates[tmps[i]];
            } else {
                noSavedTemplates.push(tmps[i])
            }
        }
        if (noSavedTemplates.length) {
            error(`The template:${noSavedTemplates.join(',')} did not existed!`);
        }

        if (oriLength !== Object.keys(templates).length) {
            const { ok } = await inquirer.prompt(
                {
                    name: 'ok',
                    type: 'confirm',
                    when: !options.force,
                    message: `Do you sure to delete the templates, continue? `
                }
            )
            if (ok !== false) {
                fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', writeFile);
            }
        }
    } else {
        if (emptyObject(templates)) {
            info('Saved templates ie empty!')
        } else {
            const choices = [];
            for (let key in templates) {
              choices.push(
                {name: `${key}--${templates[key].description}`, value: key}
              );
            }
            const { template } = await inquirer.prompt([
              {
                name: 'template',
                type: 'checkbox',
                message: `Please choose templates: `,
                choices: choices,
                pageSize: 8
              }
            ])
            if (!template.length) {
                info('You have not choose templates!');
                return;
            }
            
            const { ok } = await inquirer.prompt(
                {
                    name: 'ok',
                    type: 'confirm',
                    when: !options.force,
                    message: `Do you sure to delete the templates, continue? `
                }
            )

            if (ok !== false) {
                for (let i = 0, l = template.length; i < l; i++) {
                    delete templates[template[i]];
                }
                fs.writeFile(__dirname + '/../templates.json', JSON.stringify(templates), 'utf-8', writeFile);
            }
        }
        
    }
}

module.exports = (...args) => {
    return del(...args).catch(err => {
        error(err)
        process.exit(1)
    }); 
}