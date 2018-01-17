const execfile = require('child_process').execFile;
//const exec = require('child_process').exec;

execfile('./app.js', function (error, stdout, stderr) {
  if (error == null) {
    console.log('stdout: ' + stdout);
  } else {
    console.error(error);
  }
});