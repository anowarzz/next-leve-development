import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
export const todosRouter = express.Router();

const filePath = path.join(__dirname, "../../../db/todo.json");

// Get all todos
todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json({
    message: "from todo router",
    data,
  });
});

// Create a todos
todosRouter.post("/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log({ title, body });
  res.send("Hello world");
});

// get sigle todo
todosRouter.get("/:title", (req: Request, res: Response) => {
  console.log("From params", req.params);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

// update a todo
todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
  console.log("Todo is updating");
  res.end();
});

// delete a todo
todosRouter.delete("/delete-todo/:title", (req: Request, res: Response) => {
  console.log("Deleting a todo");
  res.end();
});
