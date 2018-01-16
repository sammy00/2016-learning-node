const qs = require('querystring');

const obj = {
  msg: 'hello world',
  sender: 'sammy00',
}

console.log(qs.stringify(obj));