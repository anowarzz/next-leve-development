/*/ 
*1. synchronous way
file read / i/o 
-> Done Inside the single thread -> not in thread pool


2. asynchronous way
file read => single thread => event loop => thread pool => task complete
 /*/
 const fs = require("fs")


 const text = "Learning File System"
 fs.writeFileSync("./hello.txt", text)
 
 const data = fs.readFileSync("./hello.txt", {encoding: 'utf-8'})
 console.log(data);