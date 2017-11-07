#!/usr/bin/env node

'use strict';
const program = require('commander');
const pkgJSON = require('../package.json');
const weappInstall = require('../lib/weapp');

program
  .version(pkgJSON.version)
  .command('install <name>')
  .option('-F, --folder <fold>', 'target folder')
  .option('-R, --registry <reg>', 'target registry')
  .description('e.g.  install <filename> -F <folder> -R <registry>')
  .action((name, options) => {
    weappInstall(name, options);
  })

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
