const path = require('path');

const base_linux = '/home/sammy';
const base_windows = 'c:\\sammy';

console.log(path.normalize(base_linux));
console.log(path.normalize(base_windows));