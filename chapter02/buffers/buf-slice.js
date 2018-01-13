
let buf = Buffer.from([1,2,3,4]);

let buf2 = buf.slice(1);
buf2[2] = 0x12;

console.log(buf);
console.log(buf2);