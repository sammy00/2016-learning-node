const eventEmitter = require('events').EventEmitter;

let counter = 0;
let em = new eventEmitter();

setInterval(() => { 
  em.emit('timed', counter++); 
}, 3000);

em.on('timed', (data) => {
  console.log('timed ' + data);
});
