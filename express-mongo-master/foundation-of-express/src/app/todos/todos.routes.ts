import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { client } from "../../config/mongodb";
export const todosRouter = express.Router();

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

// get single todo
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const todo = await collection.findOne({ _id: new ObjectId(id) });

  res.json(todo);
});

// update a todo
todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const id = req.params.id;
  const { title, description, priority, isCompleted } = req.body;
  const filter = { _id: new ObjectId(id) };

  const updatedTodo = await collection.updateOne(
    filter,
    { $set: { title, description, priority, isCompleted } },
    { upsert: true }
  );

  res.json(updatedTodo);
});

// delete a todo
todosRouter.delete("/delete-todo/:title", (req: Request, res: Response) => {
  console.log("Deleting a todo");
  res.end();
});
