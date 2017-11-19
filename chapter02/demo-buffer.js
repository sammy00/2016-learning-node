'use strict';

let a = [1,2,3];
let b = Buffer.from(a);
console.log(b);

let a2 = new Uint8Array([1,2,3]);
let b2 = Buffer.from(a2);
console.log(b2);

let b3 = Buffer.alloc(10);
console.log(b3);

// allocUnsafe allocates a buffer that may contain old or sen‐ sitive data, and will then need to be filled
let b4 = Buffer.allocUnsafe(10);
console.log(b4);
