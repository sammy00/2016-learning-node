let buf1 = new Buffer('1 is number one');
let buf2 = new Buffer('2 is number two');
//let buf3 = new Buffer(buf1.length);

//buf1.copy(buf3);
console.log(buf1.compare(buf2)); // -1
console.log(buf2.compare(buf1)); // 1
console.log(buf1.compare(buf1)); // 0
