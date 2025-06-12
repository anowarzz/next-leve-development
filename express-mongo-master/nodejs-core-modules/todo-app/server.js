const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.end("Welcome to the Todo App server");
  }

  if (req.url === "/todos" && req.method === "GET") {
    res.end("All todos Here");
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("Created a new todo");
  } else {
    res.end("Route not found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Todo server listening to port 5000");
});



/**
 *  /todos => All todos
 *  /todos/create-todos ==> Post/Create a todos
 */
