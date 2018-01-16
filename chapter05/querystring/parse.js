const qs = require('querystring');

const query = 'value1=valueone&value1=valueoneb&value2=valuetwo';

console.log(qs.parse(query));