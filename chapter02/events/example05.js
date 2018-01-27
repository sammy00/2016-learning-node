// the fundamental structure of the last callback functionality  
'use strict';

let fib = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

class Obj {
  doSomething(num, cb) {
    let callback = ('function' === (typeof cb) ? cb : null);
    if ('number' !== typeof num) {
      return callback(new Error('first arg missing or not a number'));
    }
    process.nextTick(() => {
      // block on CPU
      let data = fib(num);
      callback(null, data);
    });
  }
}

let test = new Obj();
let number = 10;

test.doSomething(number, (err, value) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Fibonacci value for %d is %d', number, value);
  }
});

console.log('called doSomething');