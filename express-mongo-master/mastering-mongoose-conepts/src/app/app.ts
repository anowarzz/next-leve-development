import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["Personal", "Work", "Study", "Other"],
    default: "Personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

const Note = model("Note", noteSchema);

// creating a note
app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Web",
    content: "",
    tags: {
      label: "database",
      color: "blue",
    },
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
