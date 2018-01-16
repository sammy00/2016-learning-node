const mime = require('mime');

const pathnames = ['hello.md', '2.js', '3.html', '4.css', '5.mp4'];
for (let name of pathnames) {
  console.log(`${name} has Content-Type as ${mime.getType(name)}`);
}