'use strict';

const fs = require("fs-extra");
const path = require('path');
const exec = require('child_process').exec;

module.exports = (name, options) => {
  const curPath = __dirname;
  const registry = options.registry;
  const cmdStr = `${registry} install ${name}`;

  exec(cmdStr, (error, stdout, stderr) => {
    console.log('error', error);
    console.log('stdout', stdout);
    console.log('stderr', stderr);
    if(!error) {
      fs.move('src', 'dist', { overwrite: true }, (err) => {
        if (err) return console.error(err)
        console.log('success!')
      })
    }

  })

  // console.log('name', name);
  // console.log('fold', options.folder);
  // console.log('resc', options.resource);

}
