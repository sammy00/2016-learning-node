'use strict';
const zlib = require('zlib');
const fs = require('fs');

let gzip = zlib.createGzip();
let inp = fs.createReadStream('input.txt');
let out = fs.createWriteStream('input.txt.gz');
inp.pipe(gzip).pipe(out);