const eventEmitter = require('events').EventEmitter;
const util = require('util');

let SomeObj = function(){};

util.inherits(SomeObj, eventEmitter);

SomeObj.prototype.sayHello = function() {
  this.emit('hello');
};

let obj = new SomeObj();

obj.on('hello', ()=>{
  console.log('Hello...');
});

// trigger the event
obj.sayHello();
