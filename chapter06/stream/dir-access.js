'use strict';
const fs = require('fs');
const path = require('path');

fs.readdir('./', (err, files) => {
  for (let file of files) {
    console.log(file);
    if (path.extname(file) == '.txt') {
      fs.unlink('./' + file, err => {
        if (err) {
          console.log(`error ${err}`)
        } else {
          console.log(`${file} is removed`);
        }
      });
    }
  }
});