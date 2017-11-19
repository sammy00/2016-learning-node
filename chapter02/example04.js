const http = require('http');
let server = http.createServer();

const HOST = '0.0.0.0';
const PORT = 3000;

server.on('request', (request, response) => {
  console.log('request event');
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
});

server.on('connection', ()=> {
  console.log('connection event');
});

server.listen(PORT, HOST, ()=> {
  console.log('listening event');
});
console.log(`Server running on ${HOST}:${PORT}`);
