# Chapter 11. Node in Development and Production  

## Debugging Node Applications  
Node provides a built-in debugger we can use to set breakpoints in the code and add watchers in order to view intermediate code results  

### The Node Debugger [DEPRECATED]   
+ insert breakpoints into your code by inserting the **debugger** command directly in the code  
+ To start debugging the application, you can specify the `debug` option when you run the application  
+ the `list` command lists out the source code lines in context  
+ add additional breakpoints using either the `setBreakpoint` command or its shortcut, `sb`   
+ set a watch on variables or expressions, using the `watch('expression')` command directly in the debugger  
+ Typing `cont` or `c` will run the application up to the first breakpoint  
+ `clearBreakpoint`/`cb` clears a breakpoint set. To use clearBreakpoint or cb, specify the name of the script and the line number of the breakpoint   
+ turn off a watcher with `unwatch`  
+ Using `sb` with no value sets breakpoint to the current line   
+ used the `step` or `s` command to step into the module function  
+ The `backtrace` or `bt` command provides a backtrace of the current execution context   
+ We can step through the external function or we can return to the application using the `out` or `o` command  

### Node Inspector  

## Unit Testing  
*Unit testing* is a way of isolating specific components of an application for testing   
### Unit Testing with Assert  
+ `Assertion` tests evaluate expressions, the end result of which is a value of either `true` or `false`    
+ Its purpose is for internal use with Node  
+ methods  

method | description 
------:|:-----------
`assert.equal`  | Fails if the expression results and given value are not equal
`assert.strictEqual`  | Fails if the expression results and given value are not strictly equal
`assert.notEqual` | Fails if the expression results and given value are equal
`assert.notStrictEqual`   | Fails if the expression results and given value are strictly equal
`assert.deepEqual`  | Fails if the expression results and given value are not equal
`assert.notDeepEqual`   | Fails if the expression results and given value are equal
`assert.deepStrictEqual`  | Similar to `assert.deepEqual()` except primitives are compared with strict equal (===)
`assert.notDeepStrictEqual`   | Tests for deep strict inequality
`assert()`/`assert.ok()`  | equivalent to `assert.isEqual(true, expression, msg) 
`assert.fail` | it takes four parameters: **a value**, **an expression**, **a message**, and **an operator**, which is used to separate the value and expression in the message when an exception is thrown
`assert.ifError`  | takes a value and throws an exception only if the value resolves to anything but `false`  
`assert.throws`/`assert.doesNotThrow` | The first expects an exception to get thrown; the second doesn't. Both methods take a code block as the first required parameter, and an optional error and message as the second and third parameters  

### Unit Testing with Nodeunit  
Nodeunit provides a way to easily run a series of tests without having to wrap every‐ thing in try/catch blocks (demo as `unit-test/nodeunit.js`)  

### Other Testing Frameworks  
Mocha, Jasmine, and Vows  

## Keeping Node Up and Running - `forever`  
+ `forever` ensures that your application restarts if it crashes  

## Benchmark and Load Testing     
+ Performance testing consists of **benchmark testing** and **load testing**  
+ Benchmark testing (a.k.a comparison testing) is running multiple versions or variations of an application and then determining which is better  
+ Load testing is basically stress testing your application  
  - You're trying to see at what point your application begins to fail or bog down because of too many demands on resources or too many concurrent users  
  - Failure is a success with load testing  
