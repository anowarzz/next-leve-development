import express, { Request, Response } from "express";
import { z } from "zod";
import { User } from "./../models/user.model";

export const userRoutes = express.Router();

// Zod schema for creating a user
const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["USER", "ADMIN", "SUPERADMIN"]).default("USER"),
});

// Create a user
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await createUserZodSchema.parseAsync(req.body);

    const body = req.body;

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Invalid User Data",
      error: error.message,
      stack: error,
    });
  }
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
