const fs = require('fs');

let writeStream = fs.createWriteStream('./log.txt',
  {'flags' : 'a',
    'encoding' : 'utf8',
    'mode' : 0666}
);

writeStream.on('open', () => {
  let counter = 0;
  // get list of files
  fs.readdir('./data/', (err, files) => {
    // for each file
    if (err) { 
      console.log(err.message);
    }else{ 
      files.forEach((name) => {
        fs.stat('./data/'+name, (err,stats)=>{
          if (err) return err;
          if(!stats.isFile()){
            console.log(`skip folder ${name}`);
            ++counter;
            return ;
          }
          // modify contents
          fs.readFile('./data/' + name,'utf8', (err,data) => {
            if (err){ 
              console.error(err.message);
            }else{
              let adjData = data.replace(/node/g, 'world');
              // write to file
              fs.writeFile('./data/' + name, adjData, (err)=>{
                if (err) { 
                  console.error(err.message);
                }else{
                  // log write
                  writeStream.write('changed ' + name + '\n',
                    'utf8', (err)=>{
                      if(err) {
                        console.error(err.message); 
                      }else {
                        console.log(`finished ${name}`);
                        if( ++counter>=files.length) {
                          console.log('all done');
                        }
                      }
                    });
                } 
              });
            } 
          });
        });
      }); 
    }
  }); 
});

writeStream.on('error', function(err) {
  console.error("ERROR:" + err);
});
