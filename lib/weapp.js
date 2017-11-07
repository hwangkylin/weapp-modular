'use strict';

const fs = require("fs-extra");
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = (name, options) => {
  if(!options.registry || !options.folder) {
    return console.error(chalk.red.bold(`\n❌ 参数错误，weapp -h 查看帮助。`));
  }
  const regSource = options.registry == 'npm' ?  'node_modules' : 'bower_components'; //暂时支持npm bower
  const srcPath = path.resolve(process.cwd(), regSource, `${name}/dist/${name}.js`);
  const distPath = path.resolve(process.cwd(), options.folder) + `/${name}.js`;
  const registry = options.registry;
  const cmdStr = `${registry} install ${name}`;
  console.log(chalk.magenta.bold('\n🚀  starting download your package...\n'));
  exec(cmdStr, (error, stdout, stderr) => {
    console.log(chalk.magenta.bold(`\n📦 ${stdout}`));
    if(!error) {
      fs.move(srcPath, distPath, { overwrite: true }, (err) => {
        if (err) return console.log(chalk.red.bold(`\n❌ ${err}`));
        console.log(chalk.green.bold('\n🌟  Install success!'));
        // 安装成功后删除目录文件夹
        fs.remove(path.resolve(regSource), err => {
          if (err) return console.error(err)
        })
      })
    } else {
      console.log(chalk.red.bold(`\n❌ ${error}`));
    }

  })


}
