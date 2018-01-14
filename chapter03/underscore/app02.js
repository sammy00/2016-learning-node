'use strict';

const us = require('underscore');
us.mixin({
  betterWithNode: function (str) {
    return str + ' is better with Node';
  }
});
console.log(us.betterWithNode('chocolate'));