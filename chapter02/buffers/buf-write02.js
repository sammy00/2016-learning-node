let buf = new Buffer(4);

buf[0] = 0x63;
buf[1] = 0x61;
buf[2] = 0x74;
buf[3] = 0x73;

console.log(buf.toString());
// output
// cats