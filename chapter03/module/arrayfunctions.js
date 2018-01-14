exports.concatArray = function (str, array) {
  /*
  return array.map(function (element) {
    return str + ' ' + element;
  });*/
  return array.map(element => (str + ' ' + element));
};