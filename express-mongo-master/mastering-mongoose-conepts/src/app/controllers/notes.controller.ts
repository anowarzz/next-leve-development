import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoute = express.Router();

// creating a note
notesRoute.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  const savedNote = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    data: savedNote,
  });
});

// get all notes
notesRoute.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Notes Retrieved Successfully",
    data: notes,
  });
});

// get a single note
notesRoute.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Note Retrieved Successfully",
    data: note,
  });
});

// update a  note
notesRoute.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const noteToUpdate = req.body;
  const updatedNote = await Note.findByIdAndUpdate(noteId, noteToUpdate, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Note Updated Successfully",
    data: updatedNote,
  });
});

// get a single note
notesRoute.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const deletedNote = await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    success: true,
    message: "Note Deleted Successfully",
    data: deletedNote,
  });
});
