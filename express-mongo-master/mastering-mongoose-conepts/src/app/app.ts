import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { notesRoute } from "./controllers/notes.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoute) ;


// server status
app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello From Note App");
  } catch (error) {
    console.log(error);
  }
});

export default app;
