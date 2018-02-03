// Using child processes to find files in subdirectories with a given search term, "example"  

const spawn = require('child_process').spawn;

const find = spawn('find', ['.', '-ls']);
const grep = spawn('grep', ['example']);

grep.stdout.setEncoding('utf8'); // pipe find output to grep input
find.stdout.pipe(grep.stdin);

// now run grep and output results
grep.stdout.on('data', data => console.log(data));

// error handling for both
find.stderr.on('data', data => console.log('find stderr: ' + data));
grep.stderr.on('data', data => console.log('grep stderr: ' + data));

// and exit handling for both
find.on('close', code => {
  if (code !== 0) {
    console.log('find process exited with code ' + code);
  }
});

grep.on('exit', code => {
  if (code !== 0) {
    console.log('grep process exited with code ' + code);
  }
});