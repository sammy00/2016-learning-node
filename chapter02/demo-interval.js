var interval = setInterval((name) => {
  console.log('Hello ' + name);
}, 3000, 'Shelley');

setTimeout((interval) => {
  clearInterval(interval);
  console.log('cleared timer');
}, 30000, interval);

console.log('waiting on first interval...');
