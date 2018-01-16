const dns = require('dns');

dns.lookup('baidu.com', function (err, address, family) {
  if (err) return console.log(err);
  console.log(address);
  console.log(family);
});