// Running a script for access to the global console  
const vm = require('vm');

global.count1 = 100;
let count2 = 100;
let txt = `if (count1 === undefined) 
            var count1 = 0; 
          count1++;

          if (count2 === undefined) 
            var count2 = 0; 
          count2++;

          console.log(count1); 
          console.log(count2);`;

let script = new vm.Script(txt);
script.runInThisContext({
  filename: 'count.vm'
});
console.log(count1);
console.log(count2);

// output
// 101
// 1
// 101
// 100