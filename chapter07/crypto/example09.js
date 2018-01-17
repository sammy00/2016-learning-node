// Checking a username and password
const crypto = require('crypto');
const fs = require('fs');

if (process.argv.length < 4) {
  console.log("too few arguments");
  process.exit();
}

let username = process.argv[2];
let password = process.argv[3];

// read out the user from db
const reader = fs.createReadStream('db.txt');
reader.on('data', data => {
  //console.log(data.toString());
  let user = JSON.parse(data.toString());
  //console.log(user);

  if (username !== user.name) {
    console.error('invalid user name');
    process.exit(-1);
  }

  let pwd_hash = crypto.createHash('sha512')
    .update(user.salt + password, 'utf8')
    .digest('hex');

  if (pwd_hash !== user.pwd_hash) {
    console.log("Your password is wrong. Try again.");
    process.exit(-1);
  } else {
    console.log("you are cool");
  }

}).on('error', err => {
  if (err) {
    console.log(err);
  }
});