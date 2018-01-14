const vm = require('vm');
const util = require('util');

let sandbox = {
  count1: 1
};

vm.createContext(sandbox);
if (vm.isContext(sandbox)) console.log('contextualized');
vm.runInContext('count1++; counter=true;', sandbox, {
  filename: 'context.vm'
});

console.log(util.inspect(sandbox));