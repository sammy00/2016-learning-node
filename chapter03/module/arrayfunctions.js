exports.concatArray = function (str, array) {
  return array.map(element => (str + ' ' + element));
};