// to be test 
const exec = require('child_process').exec;

let pwd = exec('cd');
pwd.stdout.on('data', data => console.log('stdout: ' + data));
pwd.stderr.on('data', data => console.log('stderr: ' + data));
pwd.on('close', code => console.log('child process exited with code ' + code));