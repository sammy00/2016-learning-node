// Creating a web server that accepts compressed data and decompresses it to a le
const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

const PORT = 8080;
const server = http.createServer().listen(PORT);

server.on('request', function (request, response) {
  if (request.method == 'POST') {
    let chunks = [];

    request.on('data', chunk => chunks.push(chunk));

    request.on('end', function () {
      let buf = Buffer.concat(chunks);
      zlib.unzip(buf, function (err, result) {
        if (err) {
          response.writeHead(500);
          response.end();
          return console.log('error ' + err);
        }
        let filename = `./done${Date.now()}.txt`;
        fs.createWriteStream(filename).write(result);
      });
      response.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      response.end('Received and undecompressed file\n');
    });
  }
});
console.log(`server listening on ${PORT}`);