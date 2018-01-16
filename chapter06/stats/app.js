const fs = require('fs');
const util = require('util');

fs.stat('./app.js', function (err, stats) {
  if (err) return console.log(err);
  console.log(util.inspect(stats));
});