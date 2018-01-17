const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('sha256');
hash.setEncoding('hex');

let input = fs.createReadStream('example08.js');
let output = fs.createWriteStream('example08-hash.txt');

input.pipe(hash).pipe(output);