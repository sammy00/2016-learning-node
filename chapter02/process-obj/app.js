//process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var input = process.stdin.read();
  if (input !== null) {
    // echo the text 
    process.stdout.write(input);
  } 
});
