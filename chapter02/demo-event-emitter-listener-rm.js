// DNW
const events = require('events');

let em = new events.EventEmitter();
em.on('hello', (data)=>{
  console.log(`hello ${data}`);
});

em.emit('hello', 'Tom');
em.removeListener('hello', ()=>{
  console.log('listener is removed for event "hello"');
});
em.emit('hello', 'Tom');
