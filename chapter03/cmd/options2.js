'use strict';

const program = require('commander');
program
  .version('0.0.1')
  .option('-i, --integer <n>', "An integer argument", parseInt)
  .parse(process.argv);

console.log(program.integer);