const http = require('http');

const HOST = '0.0.0.0';
const PORT = 3000;

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(PORT,HOST);

console.log(`Server running at ${HOST}:${PORT}/`);
