import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./todos/todos.routes";

const app: Application = express();

app.use(express.json());

app.use("/todos", todosRouter);

// Check server status
app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log({
      url: req.url,
      method: req.method,
      header: req.header,
    });

    next();
  },

  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Hello World From Express");
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/error",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Welcome to error er duniya");
    } catch (error) {
      next(error);
    }
  }
);

export default app;

// route error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// global error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
});
