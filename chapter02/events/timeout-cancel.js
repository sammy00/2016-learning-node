let timer1 = setTimeout((name) => {
  console.log('Hello ' + name);
}, 30000, 'Shelley');

console.log("waiting on timer...");

setTimeout((timer) => {
  clearTimeout(timer);
  console.log('cleared timer');
}, 1000, timer1);
