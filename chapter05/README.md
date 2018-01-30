# Chapter 05. Node and the Web  

## The HTTP Module: Server and Client  
+ it's low-level, focusing on stream handling and message parsing   
+ two parameters in the callback for the request event: `request` and `response`  

### Request  
+ an instance of the `IncomingMessage` class, which is a readable stream  
+ some accessible information are  

field         | description
-------------:|:-------------------------------------------------------------------------
`headers`     | The request/response header objects
`httpVersion` | HTTP request version
`method`      | Only for a `http.Server` request, and returns HTTP verb (`GET` or `POST`)
`rawHeaders`  | Raw headers
`rawTrailers` | Raw trailers

### Response  
+ an object of type `http.ServerReponse`  
+ a writable stream with support for several functions as    

function      | description
-------------:|:---------------------------
`writeHead()` | creates the response header  
`write()`     | writes the response data  
`end()`       | ends the response  

### A simple C/S model  
+ instantiate a `ClientRequest` class by the `http.request()` function in the client side  
+ the application listens for one or more `data` events, which it uses to get chunks of data in the request. The application continues getting chunks until it receives an `end` event on the request object  
+ If the application is making a lot of requests, they can get bottlenecked because of the limited pool. The way around this is to disable connection pooling by setting the `agent` to `false` in the outgoing request properties  

(demo as `http/example01.js` for servers and `http/example02.js` for clients)  

## What's Involved in Creating a Static Web Server  
### Steps to Build a Static Web Server  
1. Create an HTTP server and listen for requests.  
2. When a request arrives, parse the request URL to determine the location for the file.  
3. Check to make sure the file exists.  
4. If the file doesn’t exist, respond accordingly.  
5. If the file does exist, open the file for reading.  
6. Prepare a response header.  
7. Write the file to the response.  
8. Wait for the next request.  

### Relevant Functions  
+ `fs.stat()` function returns an error if the file doesn't exist    
+ `fs.readFile()` wants to read the file completely into memory before making it available  
+ `fs.createReadStream()` creates a readable stream for **piping** and automatical ending  
  - two events of interest  
    + `open`: emitted when the stream is ready
    + `error`: if a problem occurs   

(demo as `example03.js`)  

### `Mime` module  
+ **Problem**: the server app with `video` element won't work in IE10  
+ **Solution**: test for the file extension for each file and then return the appropriate MIME type in the response header, where the `Mime` module would come to help  
+ The `Mime` module can return the proper MIME type given a filename (with or without path), and can also return file extensions given a content type (demo as `mime/mime.js`)  
+ shoulde check for both existence and directory   
+ use the core `path` module to normalize the path string so it works in both windows and linux (`path.js`)  

A complete version of a static file server goes as `http2/app.js`  

> In Node, the predefined `__dirname` specifies the current working directory for a Node application.  

## Using Apache to Proxy a Node Application  
+ The **good** is it's extremely simple, and we have a very robust, well-known web server fielding the requests before our Node application gets hit. Apache provides security and other functionality that would be extremely difficult to implement in a Node application.  
+ The **not-so-good** is that Apache spawns a new thread for every request, and there are only so many threads to go around   

## Parsing the Query with Query String  
+ `querystring.parse()` convert a query string to an object (demo as `querystring/parse.js`)   
+ `querystring.stringify()` convert an object as a query string to send (demo as `querystring/stringify.js`)  

## DNS Resolution  
### `dns.lookup()`  
+ used to give the first returned IP address a domain name (demo as `dns/lookup.js`)  
+ parameters for the `callback(err,address,family)` are  
  - The `address` is the returned IP address  
  - the `family` value is either 4 (for IPv4) or 6 (for IPv6)  
+ an allowable `options` go as  
  - `family`: A number, 4 (for IPv4) or 6 (for IPv6)  
  - `hints`: Supported `getaddrinfo` flags, a number  
  - `all`: If `true`, returns all addresses (default is `false`) (demo as `dns/lookup2.js`)  
### `dns.resolve()`  
+ resolves a hostname into record types  
+ The types (as strings) are   

type | description 
----:|:-----------
A     | Default IPv4 address
AAAA  | IPv6 address
MX    | Mail exchange record  
TXT   | Text records
SRV   | SRV records
PTR   | Used for reverse IP lookup 
NS    | Name server
CNAME | Canonical name records
SOA   | Start of authority record

(demo as `dns/resolve.js`)  