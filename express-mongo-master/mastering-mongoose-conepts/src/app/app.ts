import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

// creating a note
app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Experss",
    content: "I want express mastery",
  });

  const savedNote = await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    data: savedNote,
  });
});


// server status
app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello From Note App");
  } catch (error) {
    console.log(error);
  }
});

export default app;
