# Chapter 08. Child Processes  

Node allows us to run a system command within a child process and listen in on its input/output  
> All but the last examples demonstrated in this chapter use Unix commands  

## 4 Techniques to Create Child Processes  
### `child_process.spawn`  
+ The most common way to create child processes is using the `spawn` method  
+ This technique launches a command in a new process, passing in any arguments   
+ Pipes are established between the parent application and the child process for `stdin`, `stdout`, and `stderr` (demo `spawn/pwd.js`)  
+ If no error occurs, any output from the command is transmitted to the child process's `stdout`, triggering a `data` event on the process (demo as `spawn/example01.js`)  
+ If an error occurs, the error gets sent to `stderr`  
+ When no error occurs, the child process exits with a code of 0  
+ with some child processes, the data is buffered in blocks before processing. The `grep` child process is one such process, whose line buffering can be turned off by using the `--line-buffered` option (demo as `spawn/line-buf.js`)  
+ The `child_process.spawn()` command does not run the command in a shell by default  
+ Beginning with Node 5.7.0 and higher, you can specify the `shell` option, and the child process will then generate a shell for the process   
+ The `child_process.spawnSync()` is a synchronous version of the same function   

### `child_process.exec` and `child_process.execFile`   
+ Both the `child_process.exec()` and `child_process.execFile()` buffers the results  
+ `exec()` spawns a shell to process the application, unlike `child_process.execFile()`, which directly runs the process (demo as `exec/exec.js`)  
+ parameters  
  - The 1st parameter in  is either the command (for `exec()`) or the file and its location (`execFile()`)  
  - the 2nd parameter is options for the command  
    + taking several values, including `encoding` and the `uid` (user id) and `gid` (group identity) of the process  
  - the 3rd one is a callback function  
+ Because `child_process.execFile()` does not spawn a shell it can't be used in some circumstances, including  
  - I/O redirection  
  - file globbing using pathname expansion (via regular expression or wildcard)   
+ if you're attempting to run a child process (or application) interactively, then use `child_process.execFile()` rather than `child_process.exec()`  
+ There are synchronous versions—`child_process.execSync()` and `child_process.execFileSync()`—of both functions  

### `child_process.fork`  
+ spawn Node processes   
+ What sets the `child_process.fork()` process apart from the others is that there's an actual communication channel established to the child process   
+ One use of `child_process.fork()` is to spin off functionality to completely separate Node instances   
+ a simple C/S app goes as `fork/server.js` and `fork/child2.js`  

## Running a Child Process Application in Windows  
3 options  
+ `child_process.exec()` spawn a shell in order to run the application (demo as `win/exec.js`)  
+ the shell option with newer versions of `child_process.spawn()` (demo as `win/spawn.js`)  
  - set the shell option to `true`  
+ invoke whatever command you want to run via the Windows command interpreter `cmd.exe` (demo as `win/example02.js`)  
  - The `/c` flag passed as the first argument to `cmd.exe` instructs it to carry out the command and then terminate  

> We can run a cmd or bat file using `child_process.execFile()`, just as we can run a file in a Unix-like environment (demo as `win/execfile.js`)  