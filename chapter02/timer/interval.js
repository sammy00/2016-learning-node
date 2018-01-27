let interval = setInterval((name) => {
  console.log('Hello ' + name);
}, 1000, 'Shelley');

setTimeout((interval) => {
  clearInterval(interval);
  console.log('cleared timer');
}, 3001, interval);

console.log('waiting on first interval...');
