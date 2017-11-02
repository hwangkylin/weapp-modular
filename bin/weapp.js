#!/usr/bin/env node

'use strict';
const program = require('commander');
const pkgJSON = require('../package.json');

program
  .version(pkgJSON.version)
  .command('install')
  .option('-f, --folder', 'target folder')
  .description('install xxx from xxx');



console.log('========',process.argv);
if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
