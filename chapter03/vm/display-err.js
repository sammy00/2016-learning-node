const vm = require('vm');

global.count1 = 100;
let count2 = 100;
let txt = `count1++;
          count2++;
          console.log(count1); 
          console.log(count2);`;

let script = new vm.Script(txt, {
  filename: 'count.vm'
});
try {
  script.runInThisContext();
} catch (err) {
  console.log(err.stack);
}