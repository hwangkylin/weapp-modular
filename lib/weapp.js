'use strict';

const fs = require("fs-extra");
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = (name, options) => {
  const registry = options.registry || 'npm';
  const folder = options.folder || 'lib';

  const regSource = registry == 'npm' ?  'node_modules' : 'bower_components'; //暂时支持npm bower
  const srcPath = path.resolve(process.cwd(), regSource, name);
  const distPath = path.resolve(process.cwd(), folder, `./${name}`);
  const cmdStr = `${registry} install ${name}`;
  const cmdMkfile = 'npm init -f';
  console.log(chalk.magenta.bold('\n🚀  starting download your package...\n'));

  // first create package.json file
  exec(cmdMkfile, (error, stdout, stderr) => {
    if(!error) {
      exec(cmdStr, (error, stdout, stderr) => {
        console.log(chalk.magenta.bold(`\n📦 ${stdout}`));
        if(!error) {
          fs.copy(srcPath, distPath, { overwrite: true }, (err) => {
            if (err) return console.log(chalk.red.bold(`\n❌ ${err}`));
            console.log(chalk.green.bold('\n🌟  Install success!'));
            // remove node_modules
            fs.remove(path.resolve(regSource), err => {
              if (err) return console.error(err)
            })
            // remove package.json
            fs.remove(path.resolve('package.json'), err => {
              if (err) return console.error(err)
            })
          })
        } else {
          console.log(chalk.red.bold(`\n❌ ${error}`));
        }

      })
    } else {
      console.log(chalk.red.bold(`\n❌ ${error}`));
    }
  })



}
