const fs = require('fs');

const input = "input.txt";

fs.writeFile(input, 'Writing to a file', function (err) {
  if (err) return console.error(err);
  fs.readFile(input, 'utf-8', function (data, err) {
    if (err) return console.error(err);
    console.log(data);
  });
});