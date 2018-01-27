# Basics of Node Modules and Node Package Manager (`npm`)  

## An Overview of the Node Module System  
+ Node's module system is patterned after the *CommonJS module system*   
+ Among the CommonJS module system requirements implemented with Node are  
  - Support is included for a `require` function that takes the module identifier and returns the exported API  
  - The module name is a string of characters, and may include forward slashes (for identification of paths)  
  - The module must explicitly export that which is to be exposed outside the module  
  - Variables are private to the module.

## How Node Finds and Loads a Module  
### Usage  
+ access by `require()`  
+ remove by `delete require()`  

### Loading   
+ Node checks to see if the module has been cached (Node caches the module on its first accessed)  
+ If **NO**, Node then checks to see if it's a native module  
+ If the module isn't cached or a native module, a new Module object is created for it, and the module's exports property is returned   

### Locating  
+ Node looks for the module in a `node_modules` subdirectory, using a search hierarchy from local up to the root  
+ As for module extension in `require()` 
  - unnecessary  
  - if specified, look in order of `.js`->`.json`->`.node`(a precompiled Node add-on)  
+ If the module is installed using npm, you don't need to provide a path; you just list the module name  
+ localized versions of a module are accessed before more global versions  
+ modules are installed  
  - locally by `npm install somemodule`  
  - globally by `npm install -g somemodule`  
+ modules checking by `require.resolve(somemodule)`   
+ If you provide a folder name as a module, Node looks for a `package.json` file that contains a `main` property flagging the module file to load  
+ If Node can't find a `package.json` file, it looks for an `index.js` or `index.node` file to load. If all these searches fail, you'll get an error   
+ If the module is the main module, the one that's actually invoked at the command line, it’s actually assigned to a property, `require.main`, of the global `require` object  

> Node wraps all scripts in the following: 
>```javascript
> function (module, exports, __filename, ...) {}
>```
> In other words, Node wraps the modules (main or otherwise) in anonymous functions, only exposing what the module developer wants to expose  

## Sandboxing and the VM Module  
+ avoid `eval()` at all costs, since it executes your JavaScript in the same context as the rest of your application    
+ using the VM module to sandbox the script   
+ The only safe way to execute an arbitrary chunk of JavaScript is in a separate process  
+ 3 types of functions  
  - `Script.runInNewContext()` or `vm.runInNewContext()`  
  - `Script.runInThisContext`  
  - `vm.runInContext()`  

### `script.runInNewContext()` or `vm.runInNewContext()`  
+ runs the script in the new context  
+ the script has no access to either local variables or the global object  
+ a new contextified sandbox is passed in the function  

(demo as `vm/runInNewCtx.js`)  

## `Script.runInThisContext([options])`  
+ have access to the global console (or other) object (demo as `vm/example01.js`)  
+ several options  

option | description 
------:|:-----------
`displayErrors` | `true` by default (demo as `vm/display-err.js`), so that if an `Error` error occurs during compilation, the line of code causing the error is attached to the stack trace  
`timeout` | specify the number of milliseconds to execute code before terminating execution which will raise an `Error`
`filename`  | specify a filename that shows up in stack traces when the script is run  

+ script can be loaded from external files (demo as `vm/load-from-script.js`)  

### `vm.runInContext()`  
+ run the script in a contextualized sandbox before the function call

> the difference between running the functions in Script and directly in VM is that the Script object precompiles the code, and you pass the filename in when you create the object rather than as one of the options to the function calls  

demo as `vm/runInCtx.js`  

## An In-Depth Exploration of NPM  
+ Modules can be installed **globally** or **locally** (default)  
+ The local installation is the best approach for an isolated project and everyone sharing the same system doesn't need access to the module  
+ subcommands of `npm` go as  

subcommand | description
----------:|:-----------
`install modulename`   |  install a local package
`install -g/--global modulename`  | install a global package
`install modulename@0.1`  | install the package of version 1.0 
`uninstall modulename`    | remove the package named `modulename`
`update`  | update all packages if any  
`update modulename`   | update a specific package named `modulename`
`install npm -g`  | update `npm` itself
`outdated`  | check to see if any packages are outdated  
`list/ls/la/ll` | list installed packages and dependencies    
`-d`  | directly install all dependencies with the `-d` flag   
`ls -g` | see modules installed globally
`config list` | lists the npm configuration settings  
`config list -l` | get a more in-depth look at all configuration settings with  
`config delete keyname`/`config set keyname value`  | modify or remove configuration settings either by using a command line  
`search modulename` | search for a package by name

+ module can be also installed from a folder on the filesystem, or a tarball that's either local or fetched via a URL   
> If you're using npm and get a "registry error parsing json" error, you can use one of the npm mirrors to complete your task  
+ The npm documentation recommends you create a `package.json` file to maintain your local dependencies  
+ run `npm init --yes` to create a default `package.json` file in the project directory  
+ update the file to reflect the newly installed module  
```bash
npm install modulename --save-dev
```
This saves the module name and version to the devDependencies field in the `package.json` file   
+ To automatically save the dependencies, you can add and/or edit a `npmrc` file  

## Creating and Publishing Your Own Node Module  
### Creating a Module  
+ export all of your exposed functions using 
  - the `exports` object   
  - `module.exports`    
+ import the library into app by `require()` (demo as `module/concat-arr.js`)  

### Packaging an Entire Directory  
+ 2 ways  
  - provide a `package.json` file with information about the directory consisting of 2 main entries  
    + `name` for module  
    + `main` is the entry point of module  
  - include either an `index.js` or `index.node` file in the directory to serve as the main module entry point  
+ why  
  - make use of existing JS libraries, and just provide a "wrapper" file that wraps the exposed functions with `exports` statements  
  - break the library down to make it easier to modify  

### Preparing Your Module for Publication  
+ recommended fields to include in the package.json file are  

filed | description 
-----:|:-----------
name  | The name of the package — required
description   | The package description
version   | The current version conforming to semantic version requirements — required
keywords  | An array of search terms
maintainers   | An array of package maintainers (includes name, email, and website)
contributors  | An array of package contributors (includes name, email, and website)
bugs  | The URL where bugs can be submitted
licenses  | An array of licenses
repository  | The package respository
dependencies  | Prerequisite packages and their version numbers

+ Good practice demands that we also provide a **test** directory with one or more testing applications, as well as a **doc** directory with documentation  
+ modify the `package.json` file to include a reference to the test scripts    

### Publishing the Module  
+ some additional requirements for the `package.json` file   
  - `test`, `doc` and `example`, etc fields for `directories` field of `package.json`  
+ test that the module can **cleanly install** using  
```bash
npm install . -g
```
+ add ourselves as npm users  
```bash
npm adduser
```
+ finally publish  
```bash
npm publish
```
+ use a `.npmignore` with the file(s) listed in the `package.json` file to ignore material  

## Discovering Node Modules and Three Must-Have Modules  
+ source: the npm website  
### Better Callback Management with Async  
+ Among the asynchronous patterns Async supports are  

pattern | description 
-------:|:-----------
waterfall   | Functions are called in turn, and results of all are passed as an array to the last callback (also called series and sequence by others). (demo as `async/example{05,06,07}.js`, `example06.js` doesn't work) 
series  | Functions are called in turn and, optionally, results are passed as an array to the last callback.
parallel  | Functions are run in parallel and when completed, results are passed to the last callback (though the result array isn't part of the pattern in some interpretations of the parallel pattern).
whilst  | Repeatedly calls one function, invoking the last callback only if a preliminary test returns false or an error occurs.
queue   | Calls functions in parallel up to a given limit of concurrency, and new functions are queued until one of the functions finishes.
until   | Repeatedly calls one function, invoking the last callback only if a post-process test returns false or an error occurs.
auto  | Functions are called based on requirements, each function receiving the results of previous callbacks.
iterator  | Each function calls the next, with the ability to individually access the next iterator.
apply   | A continuation function with arguments already applied combined with other control flow functions.
nextTick  | Calls the callback in the next loop of an event loop—based on process.next Tick in Node.

> when you're working with the Async control flow methods, all you need is to pass a callback to each asynchronous task and to call this callback when you're finished, passing in an error object (or null) and whatever data you need  

### Command-Line Magic with `Commander`  
+ chain option calls listing out all of the various options supported for the application (demo as `cmd/options1.js`)   
+ `Commander` supports  
  - concatenated short options  
  - multiwork option
  - coercion (type casting) (demo as `cmd/options2.js`)    
  - regular expressions (demo as `cmd/options3.js`) 
  - variadic argument in the last option (demo as `cmd/options4.js`)  

### The Ubiquitous `Underscore`  
+ the problem with the `underscore` is that this character has a specific meaning in REPL, which can be solved by renaming  
+ **one nice capability**: a controlled way to extend Underscore with your own utility functions via the mixin function  

demo as `underscore/app{01,02}.js`  