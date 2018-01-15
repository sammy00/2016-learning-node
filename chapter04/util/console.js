let test = {
  a: {
    b: {
      c: {
        d: 'test'
      }
    }
  }
}
// only two levels of nesting are printed out
console.log(test);
// three levels of nesting are printed 
let str = JSON.stringify(test, null, 3);
console.log(str);