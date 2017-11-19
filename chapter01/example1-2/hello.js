const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
  let name = require('url').parse(req.url, true).query.name;

  if(undefined==name) {
    name = 'world';
  }

  if('burningbird') {
    let file = 'phoenix5a.png';
    fs.stat(file, (err, stat) => {
      if(err) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Sorry, Burningbird isn't around right now \n");
      }else {
        let img = fs.readFileSync(file);
        res.contentType = 'image/png';
        res.contentLength = stat.size;
        res.end(img, 'binary');
      } 
    });
  }else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello ${name}');
  }
});

const HOST='0.0.0.0';
const PORT=3000;

server.listen(PORT,HOST,() => {
  console.log(`server running at ${HOST}:${PORT}~`); 
});
