// Retrieving directory listing for  les to modify
const fs = require('fs');

let writeStream = fs.createWriteStream('./log.txt', {
  'flags': 'a',
  'encoding': 'utf8',
  'mode': 0666
});

writeStream.on('open', () => {
  let counter = 0;
  // get list of files
  fs.readdir('./data/', (err, files) => {
    // for each file
    if (err) {
      console.log(err.message);
    } else {
      files.forEach((name) => {
        // modify contents
        fs.readFile('./data/' + name, 'utf8', (err, data) => {
          if (err) {
            console.error(err.message);
          } else {
            let adjData = data.replace(/world/g, 'node');
            // write to file
            fs.writeFile('./data/' + name, adjData, (err) => {
              if (err) {
                console.error(err.message);
              } else {
                // log write
                writeStream.write('changed ' + name + '\n',
                  'utf8', (err) => {
                    if (err) {
                      console.error(err.message);
                    } else {
                      console.log(`finished ${name}`);
                      if (++counter >= files.length) {
                        console.log('all done');
                      }
                    }
                  });
              }
            });
          }
        });
      });
    }
  });
});

writeStream.on('error', function (err) {
  console.error("ERROR:" + err);
});