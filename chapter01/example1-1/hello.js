const http = require('http');

const server = http.createServer((req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

const HOST='127.0.0.1';
const PORT=8080;

server.listen(PORT,HOST,() => {
  console.log(`server running at ${HOST}:${PORT}~`); 
});
