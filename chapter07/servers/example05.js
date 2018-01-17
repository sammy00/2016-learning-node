// A datagram client that sends messages typed into the terminal
const dgram = require('dgram');
const client = dgram.createSocket("udp4");

const HOST = 'localhost';
const PORT = 8080;

process.stdin.on('data', function (data) {
  console.log(data.toString('utf8'));
  client.send(data, 0, data.length, PORT, HOST,
    function (err, bytes) {
      if (err)
        console.error('error: ' + err);
      else
        console.log('successful');
    });
});