import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { client } from "../../config/mongodb";
export const todosRouter = express.Router();

const filePath = path.join(__dirname, "../../../db/todo.json");

// Get all todos
todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

// Create a todos
todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const { title, description, priority } = req.body;

  await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
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
