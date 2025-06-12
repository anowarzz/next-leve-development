const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.end("Welcome to the Todo App server");
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Todo server listening to port 5000");
});
