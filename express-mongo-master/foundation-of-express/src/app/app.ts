import express, { Application, Request, Response } from "express";
import { todosRouter } from "./todos/todos.routes";

const app: Application = express();

app.use(express.json());

app.use("/todos", todosRouter);

// Check server status
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From Express");
});

export default app;
