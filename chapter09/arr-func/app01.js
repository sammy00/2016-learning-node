const decArray = [23, 255, 122, 5, 16, 99];
// the redundant version
/*
const hexArray = decArray.map(function (element) {
  return element.toString(16);
});*/
// the simplified version
let hexArray = decArray.map(element => element.toString(16));
console.log(hexArray);