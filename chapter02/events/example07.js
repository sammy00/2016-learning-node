// Creating an event-based object that inherits from EventEmitter  

"use strict";

const util = require('util');
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class InputChecker extends EventEmitter {
  constructor(name, file) {
    super();

    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt', {
      'flags': 'a',
      'encoding': 'utf8',
      'mode': 0o666
    });
  }

  check(input) {
    // trim extraneous white space
    let command = input.trim().substr(0, 3);
    // process command
    // if wr, write input to file 
    if (command == 'wr:') {
      this.emit('write', input.substr(3, input.length));
    } else if (command == 'en:') { // if en, end process
      this.emit('end');
    } else { // otherwise, just echo back to standard output
      this.emit('echo', input);
    }
  }
}

// testing new object and event handling
let ic = new InputChecker('Shelley', 'output');

ic.on('write', function (data) {
  this.writeStream.write(data, 'utf8');
});

ic.on('echo', function (data) {
  process.stdout.write(ic.name + ' wrote ' + data);
});

ic.on('end', function () {
  process.exit();
});

// capture input after setting encoding
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
  let input = process.stdin.read();
  if (input !== null) {
    ic.check(input);
  }
});