let interval = setInterval((name) => {
  console.log('Hello ' + name);
}, 1000, 'Shelley');

let timer = setTimeout((interval) => {
  clearInterval(interval);
  console.log('cleared timer');
}, 10000, interval);

timer.unref();

console.log("waiting on timer...");

