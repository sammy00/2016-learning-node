
let buf1 = Buffer.from('hello');
let buf2 = Buffer.from('hello');
let buf3 = Buffer.from('world');

console.log(`${buf1} equals to ${buf2}? ${buf1.equals(buf2)}`);
console.log(`${buf1} equals to ${buf3}? ${buf1.equals(buf3)}`);
