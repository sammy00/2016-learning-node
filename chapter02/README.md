# Chapter 02. Node Building Blocks: Global Objects, Events, and Node's Asynchronous Nature  

One fundamental difference between Node and its browser-based JavaScript cousin is the **buffer** for binary data  

## The `global` and `process` Objects  
### The `global` Object  
+ When you declare a variable in a module or application in Node, the variable isn't globally available; it's restricted to the module or application (demo as `global-obj/app.js`)  
+ all variables declared outside a function in JavaScript in the browser are added to the same `global` object (demo as `global-obj/app.html`)  

### The `process` Object  
+ `process` provides information about the Node environment and the runtime environment  
+ several properties  

property | description 
--------:|:-----------
`process.versions`  | specify versions for various Node components and dependencies
`process.env`   | information about the development/production environment 
`process.release` | the name of the application, as well as URLs for the source code  

demo as `check-process.sh`  
+ several objects and functions essential for many applications, including    
  - access to the standard I/O  
  - the ability to gracefully end a Node application

### Standard Streams  
+ 3 categories  
  - standard input (`stdin`)  
  - standard output (`stdout`)  
  - standard error (`stderr`)  
+ they provides communication between the Node application and the **terminal**   
+ Node supports standard streams with three process functions  
  - `process.stdin`: a readable stream for `stdin`  
  - `process.stdout`: a writable stream for `stdout`  
  - `process.stderr`: a writable stream for `stderr`
> You cannot close these streams, or end them within the application  
+ To process incoming data using `process.stdin` (demo as `process-obj/app.js`), we need to  
  1. set the encoding for the stream  
  2. read in data with `process.stdin.read()` function   
+ terminate an application using `process.exit()` (demo as `process-obj/example01.js`)    
+ `stderr` channel was created to differentiate between expected outputs (shown in `stdout`) versus unexpected outputs  

## Buffers, Typed Arrays, and Strings  
+ Problems: handling binary data (an **octet stream**) in Ajax, WebSockets, WebGL and Canvas, etc  
  - The solution in JS for browser is the `ArrayBuffer` manipulated through typed arrays  
  - the solution in Node is the `Buffer`  
+ The Node buffer is now backed by `Uint8Array`  
+ In Node, the `Buffer` class is the primary data structure used with most I/O, and you cannot swap in a typed array without your application failing  

### Buffers  
+ when a typed array converted from a buffer  
  - The buffer's memory is **copied, not shared**  
  - The buffer's memory is interpreted as an array, not a byte array (demo as `buffers/buf2typed-arr.js`)  
+ `Buffer` is raw binary data that's been allocated outside the V8 heap  
+ Once allocated, the buffer can't be resized  
+ `Buffer` is the default data type for file access  
> safe tips: fill the buffer as soon as you create it  
+ **deprecated**: directly create a new buffer by passing the constructor function  
  - an array of octets  
  - another buffer, or  
  - a string (if unspecified, the default encoding is UTF-8)  
+ create new buffers by  
  - `Buffer.from()`: different arguments => different effect    
    + an array => a buffer with a copy of the contents (demo as `buffers/buf-from.js`) 
    + an `ArrayBuffer` with optional byte offset and length => the buffer shares the same memory as the `ArrayBuffer`  
    + a buffer => a deep copy of the input buffer  
    + a string => string copy  
  - `Buffer.alloc()`: creates a filled buffer of a certain size (demo as `buffers/buf-alloc.js`)   
  - `Buffer.allocUnsafe()`: creates a buffer of a certain size, but **may contain old or sensitive data**, and will then need to be filled, with `buf.fill()` to ensure otherwise  (demo as `buffers/buf-alloc-unsafe.js`)  

### Buffer, JSON, StringDecoder and UTF-8 Strings  

function/method | description 
---------------:|:-----------
`JSON.stringify()`  | buffer to JSON string (demo as `buffers/buf2json.js`)
`JSON.parse().data` | JSON back to bytes (demo as `buffers/example02.js`) 
`Buffer.toString([encoding,start,end])`  | `Buffer` to string (demo as `buffers/example02.js`)  

> `StringDecoder` class also serves to convert a buffer to a string (demo as `buffers/str-dec.js`)    

### Buffer Manipulation  
+ signed and unsigned 8-, 16-, and 32-bit integers, as well as floats and doubles can be read from or written to `Buffer` (demo as `buffers/buf-write01.js`)   
+ For all types other than the 8-bit integers, you can also pick whether you want **little-endian** or **big-endian** format  
+ 8-bit integers can be written to `Buffer` directly using an array-like format (demo as `buffers/buf-write02.js`)  
+ `buffer.slice()` can create a new buffer by taking a soft-copy section of the old (demo as `buffers/example03.js`)  
+ `Buffer.equals()` test whether buffers are equivalent (demo as `buffers/buf-eq.js`)   
+ `Buffer.copy()` copies bytes from one buffer to another (demo as `buffers/buf-copy.js`)  
  - if the destination isn't large enough to hold all of the contents, only the portion of bytes that fit will be copied  
+ `Buffer.compare()` returns a value indicating whether the compared buffer lexically comes before or after (demo as `buffers/buf-cmp.js`)  
+ `SlowBuffer` can be used to retain the buffer contents for a small buffer for a long period of time and should be used only if nothing else will work  

## Node's Callback and Asynchronous Event Handling  
### The Event Queue (Loop)  
+ two approaches to achieve asynchronous functionality  
  - assign a thread to each time-consuming process  
  - adopt an event-driven architecture  
    + events gets added into a queue, or event loop  
    + any dependent functionality registers an interest in events with the application  
    + when the event is pulled from the event loop and processed, the dependent functionality is invoked, with any event-related data passed to it  
    + used by JS and Node  
+ Node has its own event loop, used to facilitate server-based functionality, primarily input/output (I/O), including  
  - file access  
  - inspect information about processes  
  - waiting for a web-based request from a user    
+ events are subscribed to using the `on()` function, which the HTTP server class inherits from the `EventEmitter` class (demo as `events/example04.js`)   

### Creating an Asynchronous Callback Function  
+ 4 key functionalities  
  - Ensure the last argument is a **callback** function  
  - Create a Node `Error` and return it as the first argument in the callback function if an error occurs  
  - If no error occurs, invoke the callback function, set the error argument to `null`, and pass in any relevant data  
  - The callback function must be called within `process.nextTick()` to ensure the process doesn't block   

### `EventEmitter`  
+ The `EventEmitter` enables asynchronous event handling in Node  
+ `EventEmitter` does two essential tasks  
  - attach an event handler to an event  
  - emit the actual event  
+ The `EventEmitter.on()` event handler is invoked when a specific event is emitted (demo as `event/example06.js`)  
```javascript
em.on('some-event', callback(data) { ... });
```
+ an event is triggered via the `EventEmitter.emit()` function, and the `EventEmitter.on()` function can be used to trap that event and process it (demo as `event/example07.js`)    

> No Octal Literals in Strict Mode: must use the ES6-style literal starting with `0o`  

+ `EventEmitter.once(event-name,listener)` adds a one-time `listener` function for the event named `event-name`. The next time `event-name` is triggered, this `listener` is removed and then invoked   
+ Warning occurs for more than 10 listeners for an event. Use `setMaxListeners(n)`, passing in a number, to change the number of listeners, where `n==0` means an unlimited amount of listeners   
+ `EventEmitter.removeListener(event-name,listener)` removes listeners   

### The Node Event Loop and Timers  
+ `setTimeout()` takes a callback function as first parameter, the delay time (**in milliseconds**) as the second parameter, and an optional list of arguments  
  - setup as `timer/timeout.js` 
  - cancel as `timer/timeout-cancel.js`  
+ `setInterval()` runs the given callback repeatedly (demo as `timer/interval.js`) until the application is cancelled, or the timer is cleared with `clearInterval()`  
+ If you call `unref()` on a timer, and it's the only event in the event queue, the timer is cancelled and the program is allowed to terminate (demo as `timeout-unref{01,02}.js`)  
+ If you call `ref()` on the same timer object, this keeps the program going until the timer has processed  
+ The `setImmediate()` creates an event of  
  - higher precedence over those created by `setTimeout()` and `setInterval()`   
  - lower precedence over I/O events  

and if you call it from within a callback function, then it's placed into the next event loop after the one in which it was invoked is finished  

### Nested Callbacks and Exception Handling  
+ From synchronous sequential application pattern to an asynchronous implementation requires a couple of modifications (demo as `nested-callback/example{09,10}.js`) 
  - replace all functions with their asynchronous counterparts  
  - **nested callbacks** ensures a proper sequence   
+ check completion by adding a counter that is incremented with each log message and then checked against the file array's length to print out the "all done" message   
+ test file type by `fs.stats` method to return an object representing the data from a Unix `stat` command (demo as `nested-callback/example11.js`)    
+ callbacks nested too deeply is called **callback spaghetti** and the even more colorful **pyramid of doom**    
+ ways to implement this series of method calls without having to depend on nested callbacks, by  
  - Async module  
  - ES6 promises  