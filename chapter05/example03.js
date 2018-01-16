// A simple static file web server
'use strict';

const http = require('http');
const fs = require('fs');

const PORT = 8080;
const base = 'public_html';
http.createServer(function (req, res) {
  console.log(req.url);
  let pathname = base + req.url;
  console.log(pathname);
  fs.stat(pathname, function (err, stats) {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.write('Resource missing 404\n');
      res.end();
    } else {
      res.setHeader('Content-Type', 'text/html');
      // create and pipe readable stream
      let file = fs.createReadStream(pathname);
      file.on("open", function () {
        res.statusCode = 200;
        file.pipe(res);
      });
      file.on("error", function (err) {
        console.log(err);
        res.writeHead(403);
        res.write('file missing or permission problem');
        res.end();
      });
    }
  });
}).listen(PORT);
console.log(`Server running at ${PORT}`);