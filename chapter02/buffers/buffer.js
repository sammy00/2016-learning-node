'use strict';

let buf = new Buffer(24);
console.log(buf);

buf.fill(0);
console.log(buf);

let str = 'New String';
let buf2 = new Buffer(str);
console.log(buf2);