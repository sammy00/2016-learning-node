const vm = require('vm');

let sandbox = {
  count1: 1
};

vm.createContext(sandbox);
if (vm.isContext(sandbox)) {
  console.log('contextualized');
}
vm.runInContext('count1++; counter=true;', sandbox, {
  filename: 'context.vm'
});

console.log(sandbox);