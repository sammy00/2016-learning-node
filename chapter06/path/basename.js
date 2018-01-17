'use strict';
const fs = require('fs');
const path = require('path');

fs.readdir('./', function (err, files) {
  for (let file of files) {
    let ext = path.extname(file);
    let base = path.basename(file, ext);
    console.log('file ' + base + ' with extension of ' + ext);
  }
});