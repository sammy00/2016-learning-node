const net = require("net");
const repl = require("repl");

let connections = 0;
repl.start({
  prompt: "node via stdin> ",
  input: process.stdin,
  output: process.stdout
});
net.createServer(function (socket) {
  connections += 1;
  repl.start({
    prompt: "node via Unix socket> ",
    input: socket,
    output: socket
  }).on('exit', function () {
    socket.end();
  })
}).listen("/tmp/node-repl-sock");
net.createServer(function (socket) {
  connections += 1;
  repl.start({
    prompt: "node via TCP socket> ",
    input: socket,
    output: socket
  }).on('exit', function () {
    socket.end();
  });
}).listen(5001);