#!/usr/bin/env node

'use strict';

const program = require('commander');
const packageInfo = require('../../package.json');

program
	.version(packageInfo.version)

program
	.command('init')
	.description('生成一个项目')
	.alias('i') //简写
	.action(() => {
		require('../cmd/init')();
	});

program
    .command('add') // hs add
    .description('添加新模板')
    .alias('a') // 简写
    .action(() => {
      require('../cmd/add')();
    });

program
    .command('list') // hs list
    .description('查看模板列表')
    .alias('l') // 简写
    .action(() => {
      require('../cmd/list')();
    });

program
    .command('delete') // hs delete
    .description('删除模板列表')
    .alias('d') // 简写
    .action(() => {
      require('../cmd/delete')();
    });

//如果没有参数，运行帮助方法
program.parse(process.argv);

if(!program.args.length){
  program.help()
}