const events = require('events');

let em = new events.EventEmitter();
em.on('hello', (data)=>{
  console.log(`hello ${data}`);
});

em.emit('hello', 'Tom');
