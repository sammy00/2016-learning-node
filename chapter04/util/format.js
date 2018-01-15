const util = require('util');

let val = 10.5;
let str = 'a string';

let msg = util.format('The value is %d and the string is %s', val, str);
console.log(msg);