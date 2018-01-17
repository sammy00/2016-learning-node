// Using Crypto's createHash method and a salt to encrypt a password
const crypto = require('crypto');
const fs = require('fs');

if (process.argv.length < 4) {
  console.log("too few arguments");
  process.exit();
}

const user = {
  name: process.argv[2],
  salt: Math.round((Date.now() * Math.random())) + '',
}
user.pwd_hash = crypto.createHash('sha512')
  .update(user.salt + process.argv[3], 'utf8')
  .digest('hex');

let record = JSON.stringify(user);
console.log(record);

let db = fs.createWriteStream('db.txt');
db.write(record, {
  encoding: 'utf8'
}, () => console.log(`${user.name} has been registered`));