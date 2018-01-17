// a child process to call the Unix pwd command to print the current directory  
const spawn = require('child_process').spawn;

// ok version
//const pwd = spawn('pwd');
// error version
const pwd = spawn('pwd', ['-g']);
pwd.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});
pwd.stderr.on('data', function (data) {
  console.error('stderr: ' + data);
});
pwd.on('close', function (code) {
  console.log('child process exited with code ' + code);
});