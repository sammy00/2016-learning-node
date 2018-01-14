const vm = require('vm');

let sandbox = {
  process: 'this baby',
  require: 'that',
  console: console
};

vm.runInNewContext('console.log(process);console.log(require)', sandbox);