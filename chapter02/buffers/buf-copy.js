let buf1 = Buffer.from('this is a new buffer with a string'); 

// copy buffer
let buf2 = Buffer.alloc(10);
buf1.copy(buf2);

console.log(buf2.toString()); // this is a
