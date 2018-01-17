// Creating a very simple HTTPS server
const fs = require("fs");
const https = require("https");

const PORT = 3000;

let privateKey = fs.readFileSync('site.key').toString();
let certificate = fs.readFileSync('final.crt').toString();
const options = {
  key: privateKey,
  cert: certificate
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("Hello Secure World\n");
}).listen(PORT);