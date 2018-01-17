// The client socket sending data to the TCP server
const net = require('net');

const HOST = 'localhost';
const PORT = 8080;

const client = new net.Socket();

client.setEncoding('utf8');
// connect to server
client.connect(PORT, HOST, function () {
  console.log('connected to server');
  client.write('Who needs a browser to communicate?');
});
// when receive data, send to server
process.stdin.on('data', data => client.write(data));

// when receive data back, print to console
client.on('data', data => console.log(data));
// when server closed
client.on('close', () => console.log('connection is closed'));