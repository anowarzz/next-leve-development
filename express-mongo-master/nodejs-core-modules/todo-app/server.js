const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  // server listening
  if (req.url === "/") {
    res.end("Welcome to the Todo App server");
  }

  // get all todos
  if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.writeHead(201, {
      "content-type": "application/json",
    });

    res.end(data);
  }


  // creating a todo
  else if (req.url === "/todos/create-todo" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { title, body } = JSON.parse(data);
      const createdAt = new Date().toLocaleString();

      // reading all the todos
      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parsedAllTodos = JSON.parse(allTodos);
      // pushing new todo
      parsedAllTodos.push({ title, body, createdAt });

      // writing the updated todo list
      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.writeHead(201, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify({ title, body, createdAt }, null, 2));
    });
  }

  // no route found
  else {
    res.end("Route not found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Todo server listening to port 5000");
});
