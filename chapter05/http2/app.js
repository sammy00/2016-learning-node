// Final version of minimal static file server  
const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime');
const path = require('path');

const base = 'public_html';
const PORT = 8080;
http.createServer((req, res) => {
  pathname = path.normalize(base + req.url);
  console.log(pathname);
  fs.stat(pathname, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.write('Resource missing 404\n');
      res.end();
    } else if (stats.isFile()) {
      // content type
      let type = mime.getType(pathname);
      console.log(type);
      res.setHeader('Content-Type', type);
      // create and pipe readable stream
      let file = fs.createReadStream(pathname);
      file.on("open", () => {
        // 200 status - found, no errors
        res.statusCode = 200;
        file.pipe(res);
      });
      file.on("error", err => {
        console.log(err);
        res.statusCode = 403;
        res.write('file permission');
        res.end();
      });
    } else {
      res.writeHead(403);
      res.write('Directory access is forbidden');
      res.end();
    }
  });
}).listen(8080);
console.log(`Server running at ${PORT}`);