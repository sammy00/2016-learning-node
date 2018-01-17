'use strict';
const fs = require('fs');
const path = require('path');

fs.readdir('./', function (err, files) {
  for (let file of files) {
    console.log(`${file} has extension as ${path.extname(file)}`);
  }
});