
let buf1 = new Buffer('hello');
let buf2 = new Buffer('hello');
let buf3 = new Buffer('world');

console.log(`${buf1} equals to ${buf2}? ${buf1.equals(buf2)}`);
console.log(`${buf1} equals to ${buf3}? ${buf1.equals(buf3)}`);
