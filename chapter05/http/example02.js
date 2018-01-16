// HTTP client POSTing data to a server
'use strict';

const http = require('http');
const querystring = require('querystring');

let postData = querystring.stringify({
  'msg': 'Hello World!'
});

let options = {
  hostname: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

let req = http.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  // get data as chunks
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
  // end response
  res.on('end', function () {
    console.log('No more data in response.')
  })
});
req.on('error', function (e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write(postData);
req.end();