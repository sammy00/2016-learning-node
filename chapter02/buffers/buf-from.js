let a = [1, 2, 3];
let b = Buffer.from(a);

console.log(b);

let a2 = new Uint8Array([1, 2, 3]);
let b2 = Buffer.from(a2);

console.log(b2);