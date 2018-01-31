# Chapter 07. Networking, Sockets, and Security

Security should be always considered.  

## Servers, Streams, and Sockets  
### Sockets and Streams  
+ a **socket** is an endpoint in a communication   
+ a **network socket** is an endpoint in a communication between applications running on two different computers on the network   
+ **stream** is the data flowing between the sockets  
+ stream can be transmitted as **binary data** in a buffer, or in **Unicode** as a string. Both types of data are transmitted as **packets**: parts of the data split off into similar-sized
pieces   
+ a finish packet (**FIN**) sent by a socket signals that the transmission is done  
+ 2 types of streams  
  - half-duplex: communication can only occur in one direction at a time. e.g. walkie-talkie  
  - full-duplex: allow two-way communication  

### TCP Sockets and Servers  
+ TCP provides a way of **reliably** transmitting data between client and server sockets  
+ the TCP callback function's sole argument is an instance of a socket that can both **send** and **receive**  
+ events of interest for socket   
  - when data is received   
  - when the client closes the connection  
  - `listening`: to listen event  
  - `error`: e.g. `EADDRINUSE` signals the port is currently in use   
+ a simple C/S demo by TCP goes as `servers/example{01,02}.js`)  
+ When creating the TCP socket, you can pass in an optional parameters object, consisting of  
  - `pauseOnConnect`: `true` instructs the socket not to send a **FIN** when it receives a **FIN** packet from the client. Close the connection by `end()`    
  - `allowHalfOpen`: `true` allows the connection to be passed, but no data is read. `resume()` bootstraps reading data  
+ Instead of binding to a port with the TCP server, we can bind directly to a socket (demo as `servers/example{03,04}.js`)  
  - The *Unix socket* is a pathname somewhere on your server. The read and write permissions can be used to finitely control application access  

### UDP/Datagram Socket  
+ UDP is a connectionless protocol, which means there's no guarantee of a connection between the two endpoints  
+ Comparing to TCP, UDP is less reliable and robust, but generally faster, making it popular for real-time uses  
+ `createSocket(options[,callback])` creates a UDP socket socket, where  
  - `type` in `options` is either `udp4` or `udp6` 
  - `callback` listens for events  
+ messages sent using UDP **must be sent as buffers**, not strings  
+ without the binding to a port, the socket would attempt to listen in on every port  
+ no connection is being maintained between the client and server -- just the sockets capable of sending a message and receiving communication  

(demo as `servers/example{05,06}.js`)  

## Guards at the Gate  
### Setting Up TLS/SSL  
+ A TLS/SSL connection requires a **handshake** between client and server  
+ To achieve handshake, both the **public** and **private key** as well as the **certificate** are needed  
> If you're using a self-signed certificate, you can avoid browser warnings if you access the Node application via localhost (i.e., https://localhost:8080)  
+ Make the required files  
  - generate the private/public key pair  
  ```bash
  openssl genrsa -des3 -out site.key 2048
   ```
  - create a cerificate-signing request (CSR), where the **Common Name** indicating the hostname of the site is the most important    
  ```bash
  openssl req -new -key site.key -out site.csr
  ```
### Working with HTTPS  
Adding support for HTTPS is similar to adding support for HTTP, with the addition of an options object that provides the public encryption key and the signed certificate (demo as `ssl/example07.js`)   

### The Crypto Module  
+  a strong underlying assumption that the Node developer knows and understands **OpenSSL** and what all the various functions are

> Storing encrypted passwords is better than storing the passwords
as plain text, but passwords can be cracked if an agency or individual has the encryption key. **Storing the password as a hash is a safer approach**   

+ problem of **rainbow table**  
  - a rainbow table is basically a table of precomputed hash values for every possible combination of characters  
  - solved by **salting** (append a unique generated salt to the password before encryption)  
  - A better option is to generate a unique salt for each user password and then store it with the password  
+ a demo app goes as `crypto/example{08,09}.js`   
  - The crypto `hash` can be used in a stream (demo as `crypto/hash.js`)   
  - to check the integrity of files, create a hash of the file, and pass this along with the file when transmitting it  