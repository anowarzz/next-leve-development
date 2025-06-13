import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Application = express();

app.use(express.json());

const todosRouter = express.Router();
app.use("/todos", todosRouter);

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json({
    message: "from todo router",
    data,
  });
});

const filePath = path.join(__dirname, "../../db/todo.json");

// Main route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From Express");
});

// get sigle todo
app.get("/todos/:title/:body", (req: Request, res: Response) => {
  console.log("From params", req.params);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
});

export default app;

// [app => {express.json} => [todos route] [Root route '/']] ]
