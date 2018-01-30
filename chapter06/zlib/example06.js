// Client that compresses a le and pipes it to a web request
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const options = {
  hostname: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {
    'Content-Type': 'application/javascript',
    'Content-Encoding': 'gzip,deflate'
  }
};

const req = http.request(options, function (res) {
  res.setEncoding('utf8');

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
req.on('error', err => console.log(`problem with request: ${err.message}`));

// stream gzipped file to server
const readable = fs.createReadStream('./data.txt');
readable.pipe(gzip).pipe(req);