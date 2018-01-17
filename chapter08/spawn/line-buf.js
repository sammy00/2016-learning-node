const spawn = require('child_process').spawn;

const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['--line-buffered', 'apache2']);

ps.stdout.pipe(grep.stdin);
ps.stderr.on('data', function (data) {
  console.log('ps stderr: ' + data);
});
ps.on('close', function (code) {
  if (code !== 0) {
    console.log('ps process exited with code ' + code);
  }
});
grep.stdout.on('data', function (data) {
  console.log('' + data);
});
grep.stderr.on('data', function (data) {
  console.log('grep stderr: ' + data);
});
grep.on('close', function (code) {
  if (code !== 0) {
    console.log('grep process exited with code ' + code);
  }
});