# Chapter 06. Node and the Local System  

## Exploring the Operating System  
+ Accessing information directly about the operating system comes to us via the `os` core module  
+ The `os` module's functionality is informative only (demo as `os/app.js`)   

> The temporary folder is where files are temporarily stored. The contents are deleted when the system is restarted, or at other intervals.  

+ help to check out the resources available for the current machine (demo as `os/app02.js`)   

function | description 
--------:|:----------
`os.loadavg()`  | specific to Unix and zeros for Windows; reflect system activity  
`os.freemen()/os.totalmem()`  | return memory in bytes
`os.cpus()` |returns the number of milliseconds the CPU spent in `user`, `nice`, `sys`, `idle`, and `irq` 

## Streams and Pipes  
### basic functionality available in all streams  
+ **change the encoding** for the stream data with `setEncoding`  
+ check whether the stream is **readable**, **writable**, or both  
+ **capture stream events**, such as data received or connection closed, attaching callback functions for each  
+ **pause** and **resume** the stream  
+ **pipe** data from a readable stream to a writable stream  

### Readble Streams  
+ A readable stream starts out in a **paused** mode    
+ the stream implementations we use, such as the File System's readable stream, are switched to flowing mode as soon as we code for a data event  
+ 3 common events of interest are  
  - `data` triggered when there's a new chunk of data ready to be utilized  
  - `end` triggered when reading is done  
  - `error` triggered when errors occur  

### Writable Streams  
+ a destination data that is being sent (written) to  
+ events of interest are  
  - `error`  
  - `finish` triggered when an `end()` method is called and all the data has been flusheda  
  - `drain` triggered when an attempt to write data returns `false`  

### Transform Streams 
+ a transform stream directly connects readable streams and writable ones, **with an intermediate step transforming the data**    

## A Formal Introduction to the File System  
+ the File System is a set of wrappers that works with **POSIX functions**, supporting POSIX-standardized filesystem access functionality that works out of the box in all supported operating systems, such as OSX, Windows, Linux   
+ The File System module provides **synchronized** versions of functions, as well as the Node-traditional **asynchronous** versions  
+ The **asynchronous** functions take an **error-first callback** as last argument, while the **synchronous** functions immediately **throw an error if one occurs**     
+ The File System supports four classes  

class | description
-----:|:-----------
`fs.FSWatcher`  | Supports events for watching for file changes
`fs.ReadStream` | A readable stream
`fs.WriteStream`| A writable stream
`fs.Stats`      | Information returned from the `*stat` functions

### `fs.Stats`  
+ The `fs.Stats` object is returned if you use `fs.stat()`, `fs.lstat()`, and `fs.fstat()` (demo as `stats/app.js`)  
+  The `stat-mode` module is a purposed module that takes the `fs.Stats` object returned from a function such as `fs.stat()` and allows us to directly query values (demo as `stats/example01.js`)   

### The File System Watcher: [chokidar](https://github.com/paulmillr/chokidar)  
+ use case: "listen" for file or directory changes, and then perform some task when a change occurs (demo as `stream/chokidar.js`)  

### File Read and Write  
+ The 1st approach is to use the very simple `fs.readFile()` or `fs.writeFile()` methods (or their synchronous counterparts) (demo as `stream/rw01.js`)   
+ The 2nd approach is to open a file and assign a file descriptor (`fd`). Use the file descriptor to write and/or read from the file (demo as `stream/rw02.js`)    
  - advantage: more finite control over how the file is opened and what you can do with it when it is   

>  according to the Node documentation, the data is always written to the end of the file in Linux (the positional indicator is ignored) when the file is opened in append mode  

### Directory Access and Maintenance  
demo as `dir-access.js`  

### File Streams  
#### Readble Streams  
+ created by `fs.createReadStream(path[,options])`, or specifying a **file descriptor** in the options and leaving the `path` null  
+ default options are  
```javascript
{ 
  flags: 'r',
  encoding: null, // 'utf8' or others, or set by setEncoding() later
  fd: null,
  mode: 0o666,
  autoClose: true // automatically closes the file once the read is finished
}
```

+ To read a section of the file, you can set a begin and end (in bytes) using `start` and `end` in the options  

(demo as `stream/example03.js`)  

#### Writable Streams  
+ created by `fs.createWriteStream(path[,options])`(demo as `stream/example02.js`)  
+ Its default options are  
```javascript
{ 
  flags: 'w', // "r+" would allow both read and write 
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666, 
}
```

+ To start at a specific position after the beginning of the file, you can do so by setting the `start` option  
+ content of a readable stream can be **piped** to the writable stream by `fs.ReadStream.pipe(fs.WriteStream)` (demo as `stream/pipe.js`)  

## Resource Access with `path`   
### transform and extract data from filesystem paths  
+ `path.extname()`: extract the extension (demo as `extname.js`)  
+ `path.basename()`: get the base name (demo as `basename.js`)   

### an environmentally neutral way of dealing with filesystem paths  
+ `path.delimeter` property: `:` for unix and `;` for windows (demo as `delimeter.js`)  
+ `path.normalize()`: make a canonical path  
+ `path.parse()`: parse a filesystem path into its components (demo as `parse.js`)   

## Creating a Command-Line Utility  
+ environment: linux  
+ place at the top of the file: `#!/usr/bin/env node` ( The characters `#!` are called a **shebang**, specifying the app to execute the file, in this case Node)    
+ make the script as a executable by  
```javascript
chmod u+x your-script
```
(demo as `cmd-util/app.js`)  

## Compression/Decompression with `zlib`  
+ `zlib` is based on a transform stream  
+ compression types: `zlib` or `deflate`  
### a C/S demo  
+ overview: a client sends a compressed file to uncompress by the server  
+ server goes as 
+ client goes as 
  - The key is to ensure that the proper `Content-Encoding` as `gzip,deflate` is given in the header  
  - `Content-Type` is changed to `application/javascript`  

## Pipes and ReadLine  
demo as `readline.js`  