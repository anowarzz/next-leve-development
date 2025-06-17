import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5000;

let server: Server;
async function main() {
  try {
    await mongoose.connect(process.env.DBURL as string);
    console.log("db connected");

    server = app.listen(port, () => {
      console.log("Server Is Running With Mongoose");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
