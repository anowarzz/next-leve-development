const http = require("http");

const data = [
  {
    title: "prisma",
    body: "Learning prisma",
    createdAt: "5/18/2025, 1:25:02 AM",
  },
  {
    title: "typescript",
    body: "learning node",
    createdAt: "5/18/2025, 1:25:12 AM",
  },
];

const server = http.createServer((req, res) => {
  // server listening
  if (req.url === "/") {
    res.end("Welcome to the Todo App server");
  }
  // get all todos
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(201, {
      "content-type": "application/json",
    });

    res.end(JSON.stringify(data));
  }
  // creating a todo
  else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("Created a new todo");
  } else {
    res.end("Route not found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Todo server listening to port 5000");
});
