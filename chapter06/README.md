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
