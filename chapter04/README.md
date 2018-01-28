# Chapter 04. Interactive Node with REPL and More on the Console  

REPL is short for *read-eval-print loop* 

Whatever you type into REPL, for the most part, is processed no differently than if you had typed the JavaScript into a file and run the file using Node  

## REPL: First Looks and Undefined Expressions  
+ start by invoke `node` without any options  
+ to access the last expression, use the underscore/underline special variable (`_`)   

## Benefits of REPL: Getting a Closer Understanding of JavaScript Under the Hood  
Testing codes in REPL to check for unexpected side effects in our applications  

## Multiline and More Complex JavaScript  
+ To incorporate external modules, REPL gracefully handles multiline expressions, providing a textual indicator of code that's nested following an opening curly brace (`{`) 
  - dots indicate levels  
+ use the up and down arrow keys to traverse through the commands history    
+ keyboard control in REPL  

entry | description 
-----:|:-----------
Ctrl-C  | Terminates current command. Pressing Ctrl-C twice forces an exit. 
Ctrl-D  | Exits REPL.
Tab   | Autocompletes global or local variable.
Up arrow  | Traverses up through command history.
Down arrow  | Traverses down through command history. 
Underscore (`_`)  | References result of last expression. 

> save the results of the current context with the `.save` command  

### REPL Commands  

command | description
-------:|:-----------
`.break`  | If you get lost during a multiline entry, typing `.break` will start you over again. You’ll lose the multiline content, though.
`.clear`  | Resets the context object and clears any multiline expression. This command basically starts you over again.
`.exit`   | Exits REPL.
`.help`   | Displays all available REPL commands.
`.save`   | Saves the current REPL session to a file.
`.load`   | Loads a file into the current session (`.load /path/to/file.js`).

### REPL and rlwrap  
+ The `rlwrap` utility is a wrapper that adds GNU `readline` library functionality to command lines that allow increased flexibility with keyboard input. It intercepts keyboard input and provides additional functionality, such as enhanced line editing, as well as a persistent history of commands.  
+ The especially useful component of `rlwrap` is its ability to persist history across REPL sessions 

### Custom REPL  
1. include the REPL module (`repl`)   
2. To create a new REPL, we call the `start` method on the `repl` object by  
```javascript
repl.start(options);
```  
where some options are  

option | description
------:|:-----------
`prompt`  | Default is `>`
`input`   | Readable stream; default is `process.stdin`
`output`  | writable stream; default is `process.stdout`
`eval`    | Default is an async wrapper for `eval`
`useGlobal`   | Default as `false` starts a new context rather than using the global object
`useColors`   | Whether writer function should use colors. Defaults to REPL's terminal value
`ignoreUndefined`   | Default is `false`: don't ignore the undefined responses
`terminal`  | Set to `true` if stream should be treated like a tty (terminal), including support for ANSI/VT100 escape codes
`writer`  | Function to evaluate each command, and return formatting. Defaults to `util.inspect`.
`replMode`  | Whether REPL runs in `strict mode`, `default`, or `hybrid`

+ the `eval` function can be customized. The only requirement is that it has a specific format:   
```javascript
function eval(cmd, callback) { 
  callback(null, result);
}
```
+ an example of a REPL listening in on a TCP socket goes as (`tcp.js`) 
+ A useful application option is to create a REPL application that preloads modules (demo as `example01.js`)     
+ To run the REPL application like an executable in Linux, add the following line as the first line in the application   
```bash
 #!/usr/local/bin/node
```

## Stuff Happens—Save Often  
REPL allows us not only to try out JavaScript before including it in our files, but also to actually create our applications interactively and then **save the results when we're finished**    

## The Necessity of the Console  
The console is a way of  
+ printing out values  
+ checking operations  
+ verifying the asynchronous nature of an application  
+ providing some kind of feedback  

### Console Message Types, Console Class, and Blocking  
+ some console messaging functions  

function | description 
--------:|:-----------
`console.info()`  | equivalent to `console.log()`
`console.error()` | outputs the message plus a newline character to `stderr`
`console.warn()`  | the same as `console.error()`

+ The advantage to using console-like objects (Node `Console` class) is that you can use the global console for general feedback, reserving the newly created object for more formal reporting.  

### Formatting the Message, with Help from `util.format()` and `util.inspect()`  
+ Node only prints out two levels of nesting. If you want more, you should use `JSON.stringify()` on the object (demo as `util/console.js`)  
+ format in `console` can be achieved by printf-like formatting (demo as `util/printf.js`) backed by `util.format()` (demo as `util/format.js`)  
+ Allowable format values are  

symbol | description 
------:|:-----------
`%s`   | string 
`%d`   | number (both integer and float)  
`%j`   | JSON. Replaced with `['circular']` if the argument contains circular references  
`%%`   | to use a literal percentage sign (`%`) 

+ Extra arguments are converted to strings and concatenated to the output. If there are too few arguments, the placeholder itself is printed out (demo as `util/missing-arg.js`)   

+ whatever object is passed to `console.dir()` is passed to `util.inspect()`  
+ options for `util.inspect()` are   

option  | description 
-------:|:-----------
`showHidden`  | to display non-enumerable or symbolic properties (default is `false`) 
`depth`   | how many times to recurse to inspect object (default is 2)
`colors`  | if true, output is styled with ANSI color codes (default is `false`)
`customInspect` | if `false`, then custom inspect functions defined on the objects being inspected won't be called (default is `true`)

(demo as `util/example02.js`)  

### Providing Richer Feedback with console and a Timer  
+ motivation: add a timer and output a begin and end time  
+ implementation: `console.time()` and `console.timeEnd()`, passing a timer name to both (demo as `console-timer.js`,`timing-server.js`)  







