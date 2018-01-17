const cp = require('child_process');
const cp1 = cp.fork('child2.js');
const http = require('http');

let server = http.createServer();
server.on('request', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('handled by parent\n');
});
server.on('listening', function () {
  // send the server to the child process  
  cp1.send('server', server);
});
server.listen(8080);