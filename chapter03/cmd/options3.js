'use strict';

const program = require('commander');
program
  .version('0.0.1')
  .option('-d --drink [drink]', 'Drink', /^(coke|pepsi|izze)$/i)
  .parse(process.argv);

console.log(program.drink);