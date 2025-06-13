import "dotenv/config"; // Load environment variables first
import { client } from "../config/mongodb";
import app from "./app";

let server;
const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  await client.connect();
  console.log("Connected To Mongodb");

  server = app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

bootstrap();
