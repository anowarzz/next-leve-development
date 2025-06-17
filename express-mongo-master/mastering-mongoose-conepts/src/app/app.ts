import express, { Application, Request, Response } from "express";
import { notesRoute } from "./controllers/notes.controller";
import { userRoutes } from "./controllers/user.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoute);
app.use("/users", userRoutes);

// server status
app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello From Note App");
  } catch (error) {
    console.log(error);
  }
});

export default app;
