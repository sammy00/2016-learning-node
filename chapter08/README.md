# Chapter 08. Child Processes  

Node allows us to run a system command within a child process and listen in on its input/output  
> All but the last examples demonstrated in this chapter use Unix commands  

## 4 Techniques to Create Child Processes  
### `child_process.spawn()`  
+ the most common way    
+ launches a command in a new process, passing in any arguments   
+ pipes are established between the parent application and the child process for `stdin`, `stdout`, and `stderr` (demo `spawn/pwd.js`)  
+ if no error occurs, any output from the command is transmitted to the child process's `stdout`, triggering a `data` event on the process (demo as `spawn/example01.js`)  
+ if an error occurs, the error gets sent to `stderr`  
+ when no error occurs, the child process exits with a code of 0  
+ some child processes buffer the data in blocks before processing  
  - The `grep` child process is one such process, whose line buffering can be turned off by using the `--line-buffered` option (demo as `spawn/line-buf.js`)  
+ `child_process.spawn()` command does not run the command in a shell by default  
  - beginning with Node 5.7.0 and higher, the child process will generate a shell for the process if the `shell` option is specified  
+ `child_process.spawnSync()` is a synchronous version of the same function   

### `child_process.exec()` and `child_process.execFile()`   
+ both the `child_process.exec()` and `child_process.execFile()` buffers the results  
+ `exec()` spawns a shell to process the application, while `execFile()` directly runs the process (demo as `exec/exec.js`)  
+ parameters  
  - The 1st parameter in  is either the command (for `exec()`) or the file and its location (`execFile()`)  
  - the 2nd parameter is options for the command  
    + taking several values, including `encoding` and the `uid` (user id) and `gid` (group identity) of the process  
  - the 3rd one is a callback function  
+ due to spawning no shell, `execFile()` can't be used in some circumstances, including  
  - I/O redirection  
  - file globbing using pathname expansion (via regular expression or wildcard)   
+ if an interactive child process (or application) is wanted, use `execFile()` rather than `exec()`  
+ there are synchronous versions — `execSync()` and `execFileSync()` — of both functions  

### `child_process.fork()`  
+ spawn Node processes   
+ `fork()` process has an actual communication channel established to the child process (but no others)  
+ one use case: spin off functionality to completely separate Node instances   
+ a simple C/S app goes as `fork/server.js` and `fork/child2.js`  

## Running a Child Process Application in Windows  
3 options  
+ `child_process.exec()` spawn a shell in order to run the application (demo as `win/exec.js`)  
+ the shell option with newer versions of `child_process.spawn()` (demo as `win/spawn.js`)  
  - set the shell option to `true`  
+ invoke whatever command you want to run via the Windows command interpreter `cmd.exe` (demo as `win/example02.js`)  
  - The `/c` flag passed as the first argument to `cmd.exe` instructs it to carry out the command and then terminate  

> We can run a cmd or bat file using `child_process.execFile()`, just as we can run a file in a Unix-like environment (demo as `win/execfile.js`)  