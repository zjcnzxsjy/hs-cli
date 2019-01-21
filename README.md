# hs-cli--一键下载 github vue项目模板
## 简述
脚手架就是一个能够快速搭建完整文件文件结构的项目样板，比较常见的脚手架有yeoman、vue-cli等。vue-cli现在已经迭代到3.x版本，生成的项目结构精简了不少，功能也很丰富。于是参考vue-cli开发了一个简易版的脚手架。  
## 脚手架依赖的主要插件
- chalk：改变控制台字符样式
- commander：一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能
- inquirer：交互式命令行工具
- ora：实现命令行环境的loading效果，和显示各种状态的图标等
- download-git-repo：从github上下载repository到本地环境
## 脚手架的命令
### init--初始化project

```
.command('init <project-name>')
.description('generate a project from a local or remote template ')
.option('-p, --preset <templateName>', 'Skip prompts and use saved template')
.option('-c, --clone', 'use git clone')
.option('-f, --force', 'Overwrite target directory if it exists')
```
这里踩的一个坑是由于本地没有配置过git的ssh，所以init指令带-c一直报128的错误，配置ssh后就没有这个问题了。
## add--添加项目模板

```
.command('add')
.description('add a new template in saved templates ')
```
该指令会要求输入repository的repo(名称名称),owner,branch(分支),dexcription。owner/repo对应github里Owner/Repository name形式。模板信息缓存在tempate.json文件内
## delete--删除项目模板

```
.command('delete')
.description('delete a saved template ')
.option('-t, --template <template-name>', 'Skip prompts and delete saved template')
.option('-f, --force', 'Sure to delete the template')
```
在template.json文件内找到对应的模板删除
## list--展示模板列表信息

```
.command('list')
.description('list saved templates ')
```
以表格形式展示添加在template.json文件内的模板信息。