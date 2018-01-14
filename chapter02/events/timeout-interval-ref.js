let timer = setTimeout((name) => {
  console.log('Hello ' + name);
}, 30000, 'Shelley');

timer.unref();

console.log("waiting on timer...");

