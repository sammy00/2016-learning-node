// Basic web server with additional event highlighting  

const http = require('http');
let server = http.createServer();

const HOST = '127.0.0.1';
const PORT = 8080;

server.on('request', (request, response) => {
  console.log('request event');
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('Hello World\n');
});

server.on('connection', () => {
  console.log('connection event');
});

server.listen(PORT, HOST, () => {
  console.log('listening event');
});
console.log(`Server running on ${HOST}:${PORT}`);