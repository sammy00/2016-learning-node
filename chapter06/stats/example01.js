// Getting  le permissions using stat-mode  
const fs = require('fs');
const Mode = require('stat-mode');

fs.stat('./example01.js', function (err, stats) {
  if (err) return console.log(err);
  // get permissions
  let mode = new Mode(stats);
  console.log(mode.toString());
  console.log('Group execute ' + mode.group.execute);
  console.log('Others write ' + mode.others.write);
  console.log('Owner read ' + mode.owner.read);
});