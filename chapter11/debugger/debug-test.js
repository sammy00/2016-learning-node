const fs = require('fs');
const concat = require('./external.js').concatArray;

let test = 10;
let second = 'test';

for (let i = 0; i <= test; i++) {
  debugger;
  second += i;
}
setTimeout(function () {
  debugger;
  test = 1000;
  console.log(second);
}, 1000);
fs.readFile('./log.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arry = ['apple', 'orange', 'strawberry'];
  let arry2 = concat(data, arry);
  console.log(arry2);
});