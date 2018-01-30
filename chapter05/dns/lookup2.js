const dns = require('dns');

dns.lookup('baidu.com', {
  all: true
}, (err, address, family) => {
  if (err) return console.log(err);
  console.log(address);
  console.log(family);
});