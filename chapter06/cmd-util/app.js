#!/usr/bin/env node

'use strict';
const program = require('commander');

program.version('1.0.0')
  .option('-m,--message [message]', 'a greeting message')
  .parse(process.argv);

if (undefined === program.message) {
  console.log('a greeting message must be specified');
  process.exit();
}

console.log(`${program.message} to you too~`);