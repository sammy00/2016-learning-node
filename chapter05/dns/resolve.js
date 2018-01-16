const dns = require('dns');

dns.resolve('github.com','MX', function(err,addresses) {
  if (err) return err;
  console.log(addresses);
});