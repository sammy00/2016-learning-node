// A UDP socket server, bound to port ${PORT}, listening for messages
const dgram = require('dgram');

const PORT = 8080;

const server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  console.log("Message: " + msg + " from " + rinfo.address + ":" +
    rinfo.port);
});
server.bind(PORT);