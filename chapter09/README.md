# Chapter 09. Node and ES6  

## Strict Mode  
+ Strict mode is turned on when `"use strict";` is added to the top of the Node application  
+ strict mode can also be forced using the `--strict_mode` flag   

> Just use strict mode in your application or modules, where you control your code.  

+ **octal literals** ain't allowed in strict mode (demo as `octal-literal.js`)  
  - the octal literal need converting to a safe format by  
    + replacing the leading zero with `0o`    
    + making it as string  

## `let` and `const`  
### `let`  
+ `let` declares a block-scoped variable (demo as `let.js`)  
  - variables declared with `var` will be hoisted to the top of the execution scope before any statements are executed.
### `const`  
+ the `const` statement declares a read-only value reference  
+ If the value is a **primitive**, it is immutable (demo as `const1.js`)  
+ If the value is an object, you can't assign a new object or primitive, but **you can change object properties** (demo as `const2.js`)  
+ use `object.freeze()` on the object to provide at least shallow immutability   

## Arrow Functions  
+ merits  
  - simplify syntax (demo as `arr-func/app01.js`)  
  - redefine the meaning of `this` (demo as `arr-func/this.js`)   
    + in case of nesting functions, we need to use another variable, typically `self`, which could be closed over—attached to the given environment  
    + for arrow functions, `this` is always set to the value it would normally have within the enclosing context  
+ The `function` keyword is removed and the fat arrow (`=>`) is used to represent the existence of the anonymous function, passing in the given parameters  

## Classes   
demo as `input-checker.js`  
