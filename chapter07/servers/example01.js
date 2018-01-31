// A simple TCP server, with a socket listening for client communication on port ${PORT}
const net = require('net');

const PORT = 8080;

let server = net.createServer(conn => {
  console.log('connected');

  conn.on('data', data => {
    console.log(`${data} from ${conn.remoteAddress} ${conn.remotePort}`);
    conn.write(`Repeating: ${data}`);
  });

  conn.on('close', () => console.log('client closed connection'));
}).listen(PORT);

server.on('listening', () => console.log('listening on ' + PORT));

server.on('error', err => {
  if (err.code == 'EADDRINUSE') {
    console.warn('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
  } else {
    console.error(err);
  }
});

// testing by "nc localhost 8080 < hello.txt"