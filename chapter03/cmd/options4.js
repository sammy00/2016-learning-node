// [DNW]  
'use strict';

const program = require('commander');
program
  .version('0.0.1')
  .command('keyword <keywork> [otherKeywords...]')
  .action(function (keyword, otherKeywords) {
    console.log('keyword %s', keyword);
    if (otherKeywords) {
      otherKeywords.forEach((oKey) => console.log('keyword %s', oKey));
    }
  });