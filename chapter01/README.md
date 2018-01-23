# Chapter 01. The Node Environment  

Node can be installed on almost any machine and used for any purpose, including running applications on your PC or even your tablet, smartphone, or microcomputer  

## Installing Node  
+ options  
  - binaries (precompiled executables) for Windows, OS X, SunOS, Linux, and ARM architectures  
  - build from source codes  
  - package installer for your architecture  

## A Basic Hello World Application  
+ several key components  
  - modules  
    + incorporate external specific types of functionality that can then be used in an application (or another module)  
    + imported using the `require` statement, and the result assigned to a local variable  
  - callback  
  - Node emulates an asynchronous environment in a single-threaded environment via an **event loop**, with associated callback functions that are called once a specific event has been triggered 

(demo as `example1-1/hello.js`)  

## Hello World, Tweaked  
+ Exported module properties can be chained  
+ The `fs.stats()` method uses the standard Node callback function pattern with the error value as the first parameter—frequently called an *errback*  
+ not all Node I/O is asynchronous 

(demo as `example1-2/hello.js`)  

## Node Command-Line Options  

option | description 
------:|:-----------
`-h`/`--help` | list out all of the options  
`-v`/`--version`| find the version of Node 
`-c`/`--check`  | check the syntax of a Node application 
`--v8-options`  | discover the V8 options  
`-p`/`--print`  | evaluate a line of Node script and print the results

## Node, V8, and ES6  
+ ES6 feature support is based on the following criteria  
  - All **shipping** features, which V8 considers stable, are turned on by default on Node.js and **do not** require any kind of runtime flag  
  - **Staged** features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--es_staging` (or its synonym, `--harmony`)  
  - **In-progress** features can be activated individually by their respective harmony flag (e.g., `--harmony_destructuring`), although this is highly discouraged unless for testing purposes  
