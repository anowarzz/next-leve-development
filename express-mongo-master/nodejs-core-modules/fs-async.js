/*/ 
* asynchronous way => file read => single thread => event loop => thread pool => task complete
 /*/

const fs = require("fs");

let text = "node js";

fs.readFile("hello-world.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("something went wrong");
    return;
  }
  fs.writeFile("./hello.txt", data, { encoding: "utf-8" }, (err) => {
    if (err) {
      console.log("something went wrong");
      return;
    }

    console.log("written succesfully");
  });
});
