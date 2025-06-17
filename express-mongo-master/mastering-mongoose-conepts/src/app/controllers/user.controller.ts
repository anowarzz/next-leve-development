import express, { Request, Response } from "express";
import { User } from "./../models/user.model";

export const userRoutes = express.Router();

// Create a user
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await User.create(userData);

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: user,
  });
});

// get all users
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "All Users Retrieved Successfully",
    data: users,
  });
});

// get a single user
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(200).json({
    success: true,
    message: "User Retrieved Successfully",
    data: user,
  });
});

// update a user
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userToUpdate = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, userToUpdate, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: updatedUser,
  });
});

// delete a user
userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const deletedUser = await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
    data: deletedUser,
  });
});
