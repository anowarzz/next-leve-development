import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

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
app.post("/note/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  const savedNote = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    data: savedNote,
  });
});

// get all notes
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Notes Retrieved Successfully",
    data: notes,
  });
});

// get a single note
app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Note Retrieved Successfully",
    data: note,
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
