let test = {
  a: {
    b: {
      c: {
        d: 'test'
      }
    }
  }
};
let str = require('util').inspect(test, {
  showHidden: true,
  depth: 4
});
console.log(str);