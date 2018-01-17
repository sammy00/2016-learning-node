const program = require('commander');
const fs = require('fs');
const zlib = require('zlib');

program
  .version('0.0.1')
  .option('-f, --file [file name]', 'Source File Name')
  .option('-o, --out [file name]', 'Destination File name')
  .option('-t, --type <mode>', /^(gzip|deflate)$/i)
  .option('-u,--uncompress', 'specify in case of uncompression')
  .parse(process.argv);

if (undefined === program.file) {
  console.error("the source file must be provided");
  process.exit(-1);
}

let input = fs.createReadStream(program.file);

if (program.uncompress) {
  let chunks = [];
  input.on('open', () => {
    console.log("start reading");
  });
  input.on('data', (chunk) => {
    chunks.push(chunk);
  });
  input.on('error', err => {
    if (err) {
      console.error(err);
    }
  });
  input.on('end', () => {
    let buf = Buffer.concat(chunks);
    zlib.unzip(buf, (err, res) => {
      let timestamp = Date.now();
      let filename = './done' + timestamp + '.txt';
      fs.createWriteStream(filename).write(res);
      console.log('done unziping');
    });
  });
} else {
  if (undefined === program.out) {
    console.error("the destination file must be provided");
    process.exit(-1);
  }
  let out = fs.createWriteStream(program.out);

  let zip_stream = ('deflate' == program.type ? zlib.createDeflate() : zlib.createGzip());

  input.pipe(zip_stream).pipe(out);
}