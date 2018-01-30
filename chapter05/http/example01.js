// Server that listens for a POST and processes posted data
'use strict';

const http = require('http');
const querystring = require('querystring');

const PORT = 8080;
let server = http.createServer().listen(PORT);
server.on('request', (request, response) => {
  if (request.method == 'POST') {
    let body = '';
    // append data chunk to body
    request.on('data', data => body += data);
    // data transmitted
    request.on('end', () => {
      let post = querystring.parse(body);
      console.log(post);
      response.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      response.end('Hello World\n');
    });
  }
});
console.log(`server listening on ${PORT}`);