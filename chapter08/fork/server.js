const cp = require('child_process');
const cp1 = cp.fork('child2.js');
const http = require('http');

let server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('handled by parent\n');
});

// send the server to the child process  
server.on('listening', () => cp1.send('server', server));
server.listen(8080);