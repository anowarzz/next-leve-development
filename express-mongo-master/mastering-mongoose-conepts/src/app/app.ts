import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello From Note App");
  } catch (error) {
    console.log(error);
  }
});

export default app;
