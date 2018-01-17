const execfile = require('child_process').execFile;
execfile('my.bat', function (error, stdout, stderr) {
  if (error == null) {
    console.log('stdout: ' + stdout);
  }
});