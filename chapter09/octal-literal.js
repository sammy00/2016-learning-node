"use strict";
const fs = require('fs');

// NOT ALLOWED
// fs.open('./data.txt', 'a+', 0666, function (err, fd) {
// OK
fs.open('./data.txt', 'a+', 0o666, function (err, fd) {
  if (err) return console.error(err);
  fs.write(fd, 'First line', 'utf-8', function (err, written, str) {
    if (err) return console.error(err);
    let buf = new Buffer(written);
    fs.read(fd, buf, 0, written, 0, function (err, bytes, buffer) {
      if (err) return console.error(err);
      console.log(buf.toString('utf8'));
    });
  });
});