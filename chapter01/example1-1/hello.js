const http = require('http');

const server = http.createServer((req,res)=>{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

const HOST='0.0.0.0';
const PORT=3000;

server.listen(PORT,HOST,() => {
  console.log(`server running at ${HOST}:${PORT}~`); 
});
