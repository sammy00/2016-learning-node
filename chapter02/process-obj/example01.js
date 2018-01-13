process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let input = process.stdin.read();
  if (input !== null) {
    // echo the text 
    process.stdout.write(input);
    const command = input.trim(); 
    if (command == 'exit') {
      process.exit(0);
    }
  }
});
