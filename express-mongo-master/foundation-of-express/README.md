# 🚀 Foundation of Express - Learning Notes

<div align="center">

![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-14-red?style=for-the-badge)

_Building Web Servers & RESTful APIs with Express.js_

</div>

---

## 📚 Module Overview

This module explores Express.js, a minimal and flexible Node.js web application framework that provides robust features for building web servers and APIs. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Express.js Introduction & Core Concepts
- ✅ Routing & HTTP Method Handlers
- ✅ Middleware Implementation & Flow
- ✅ Request & Response Objects
- ✅ Error Handling & Best Practices
- ✅ Building RESTful APIs

---

<br>

## Introduction to Express: Why & How to Get Started

**Express Js is a Fast, unopinionated , minimalist Node Js framework for Building web servers and APIs**

Express JS is all written with Node js

> It handles routing, middleware, and HTTP requests/responses efficiently. Express allows me to structure backend logic cleanly and integrate with databases, templating engines, or frontend frameworks easily. It’s my go-to for RESTful APIs because it’s lightweight but powerful.

**Unopinionated Means**

> ❝ It Gives us the freedom to choose how to structure, organize, and build our application — they don't impose strict rules, defaults, or patterns. ❞

**WHY USE EXPRESS**

- Complex Routing Management
- Easier Handling Of Request and Response
- Middleware to handle complex logic
- Easy Handling of Errors

<br/>

## Creating Basic Web server with express

- Dependencies are uses in Production
- Dev Dependencies are only used in development process

`server.ts` is used to connect and controlling the server connection

```tsx
import app from "./app";
let server;
const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${5000}`);
  });
};
bootstrap();
```

`app.ts` is used to managing the application , route , middleware and others

```tsx
import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.post("/todo/create-todo", (req: Request, res: Response) => {
  res.send("Creating a todo");
});

export default app;
```

<br/>

## What is parsers, request and response object

Frontend থেকে কোন Data যদি Express Server এ সেন্ড করা বা Post করা হয় তাহলে সার্ভার সেই Data গুলো Request এর Body থেকে Automatic ভাবে Parse করতে পারে না ।

এ জন্য আমাদের Parser ব্যবহার করতে হয় ।

JSON ডাটা এর জন্য express.json এবং Text Data এর জন্য express.text এমন Parser ব্যবহার করতে হয় ।

The request and the response object of node js and express js are the same one

- `TSC -W` - Flag is used to real time changes from TS to JS
- `nodemon index.js` - Flag is used to run the server again on any code change
- we can write a script in package json for nodemon make it easy start the dev server

```jsx
     "scripts": {
    "dev" : "nodemon ./dist/app/server.js"
  },
```

`res.send(data)` এর মাধ্যমে JSON Data পাঠালেও client বুঝতে পারবে না কি Type এর Data

তাই `res.json(data)` ব্যবহার করা হয় ।

Client থেকে JSON পাঠানো হলেও Server সেটা Read করতে পারবে না যদি না Parse করা হয় । Node JS এর মধ্যে Manually Parse করতে হলেও Express এর মধ্যে `app.use(express.json())` Middleware ব্যবহার করার মাধ্যমে Automatic Parse করে ফেলে Express JS

Everything in express js is a middleware

### 🔹 **Sending Data (Server → Client)**

| Feature                     | **Raw Node.js**                              | **Express.js**                            |
| --------------------------- | -------------------------------------------- | ----------------------------------------- |
| Manual stringification      | ✅ Yes (`JSON.stringify()`)                  | ❌ No — Express auto-stringifies objects  |
| Set headers manually        | ✅ Yes (`res.writeHead`,`Content-Type`)      | ❌ No — Express handles it automatically  |
| Response method             | `res.write()`/`res.end()`                    | `res.json()`or`res.send()`                |
| Manual data collection      | ✅ Yes (use`req.on('data')`,`req.on('end')`) | ❌ Not needed                             |
| Need to parse JSON manually | ✅ Yes (`JSON.parse()`)                      | ❌ No —`express.json()`middleware does it |
| Built-in body parser        | ❌ No                                        | ✅ Yes (via`express.json()`middleware)    |

<br/>

## What is Params & Queries

🔸 **params (Route Parameters):**

👉 URL এর path এর অংশ → dynamic segment

👉 Format: `/users/:id`

👉 Access: `req.params`

👉 Use-case: Specific data fetch (like user by ID)

```jsx
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});
```

🟩 URL: `/users/5` → `req.params.id = "5"`

---

🔸 **query (Query Strings):**

👉 URL এর `?` এর পরের অংশ

👉 Format: `/search?term=cat&page=2`

👉 Access: `req.query`

👉 Use-case: Filter, search, pagination

```jsx
app.get("/search", (req, res) => {
  const term = req.query.term;
  const page = req.query.page;
  res.send(`Searching for ${term} on page ${page}`);
});
```

🟩 URL: `/search?term=cat&page=2` →

`req.query.term = "cat"`

`req.query.page = "2"`

---

🔹 **মনে রাখার মত**

- `params` = fixed route structure
- `params` → Backed এ URL এর জন্য Dynamic Part Set করতে হয়

```jsx
app.get("/todos/:title/:body"
```

- `query` → Client Side থেকে Request এর সাথে আসে URL এর সাথে `?` এর পরে
- `query` = optional, dynamic filtering

```jsx

{{local_host}}/todos/express/learing-express?
title=prisma&body=Learning-Prisma

```

মুলত যখন একটি Single Data Get করতে হয় তখন Dynamic Id (Param) ব্যবহার করা হয় এবং যখন Multiple Data Get করতে হয় তখন Query ব্যবহার করা হয়

<br/>

## Routing In Express JS

🔸 **Routing মানে কী?**

👉 Client-এর request এর উপর নির্ভর করে, কোন নির্দিষ্ট কোন URL-এ কোন function চলবে — এটাকেই routing বলে ।

👉 Request method + URL path = একটা specific response handle করে

---

🔸 **Basic Syntax:**

```jsx
app.METHOD(PATH, HANDLER);
```

📌 METHOD = GET / POST / PUT / DELETE

📌 PATH = URL path (e.g. `/`, `/about`)

📌 HANDLER = callback function → `(req, res) => {}`

---

🔸 **Example Routes:**

```jsx
const todosRouter = express.Router();
app.use("/todos", todosRouter);

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json({
    message: "from todo router",
    data,
  });
});

app.put("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} Updated`);
});

app.delete("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} Deleted`);
});
```

---

🔸 **Route Parameters (`:id`)**

👉 Dynamic URL parts → Access via `req.params`

🔸 **Query Strings**

👉 `/search?name=anowar` → `req.query.name`

🔸 **Chained Route Handling:**

```jsx
app
  .route("/book")
  .get((req, res) => res.send("Get Book"))
  .post((req, res) => res.send("Add Book"))
  .put((req, res) => res.send("Update Book"));
```

---

🔸 **Routing Middleware (Optional):**

👉 For splitting routes into separate files/modules

```jsx
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);
```

---

🔹 **মনে রাখার মত**

- Routing = Request method + URL path → callback
- `req.params` = route parameter
- `req.query` = query string
- `.route()` দিয়ে multiple methods একই path-এ bind করা যায়
- বড় apps → routes আলাদা ফাইলে রাখা ভালো

<br/>

## Organizing Codes & Splitting The Routes

Code Organized রাখার জন্য প্রতিটা Service এর জন্য আলাদা আলাদা Router Instance Create করে Code Split করে রাখতে হবে ।

```tsx
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
export const todosRouter = express.Router();

const filePath = path.join(__dirname, "../../../db/todo.json");

// Get all todos
todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json({
    message: "from todo router",
    data,
  });
});

// Create a todos
todosRouter.post("/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log({ title, body });
  res.send("Hello world");
});

// get sigle todo
todosRouter.get("/:title", (req: Request, res: Response) => {
  console.log("From params", req.params);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

// update a todo
todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
  console.log("Todo is updating");
  res.end();
});

// delete a todo
todosRouter.delete("/delete-todo/:title", (req: Request, res: Response) => {
  console.log("Deleting a todo");
  res.end();
});
```

<br/>

## Connecting MongoDB to Express

```tsx
import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
let server;
const PORT = process.env.PORT || 5000;
const uri =
  "mongodb+srv://mongoTodoUser:mongouser@cluster0.udcvnpg.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const bootstrap = async () => {
  await client.connect();
  console.log("Connected To Mongodb");
  server = app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};
bootstrap();
```

<br/>

## Creating & Reading ToDos

```tsx
// Get all todos
todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

// Create a todos
todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const { title, description, priority } = req.body;

  await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});
```

<br/>

## Get Single ToDO, Updating & Deleting ToDos

```tsx
// get single todo
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const todo = await collection.findOne({ _id: new ObjectId(id) });

  res.json(todo);
});

// update a todo
todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const id = req.params.id;
  const { title, description, priority, isCompleted } = req.body;
  const filter = { _id: new ObjectId(id) };

  const updatedTodo = await collection.updateOne(
    filter,
    { $set: { title, description, priority, isCompleted } },
    { upsert: true }
  );

  res.json(updatedTodo);
});
```

<br/>

## Understanding Middleware in Express

Express এর সবকিছুই Middleware এর মাধ্যমে হয়ে থাকে । একটির পর আরেকটি Middleware এ Jump করতে করতে Express তার Request এবং Response Model টি Handle করে থাকে ।

**Middleware হচ্ছে একটি মধ্যবর্তী Function যে**

Request এবং Response এর মধ্যে থাকে । Request এর উপর কাজ করতে পারে এবং Request এর সাথে Client side থেকে কি আসছে সুগুলো দেখতে পারে, নতুন কিছু এড করতে পারে বা রিমুভ করতে পারে । Middleware মূলত Authentication বা Token verification এর Purpose এ বেশি ব্যবহার করা হয় ।

কোন Route এ চাইলে অনেকগুলো Middleware ব্যবহার করা যায় তবে প্রতিটি Middleware এর কাজ শেষে Next () কল করতে হবে ।

<br/>

## Error Handling in Express: 404s & Global Error Handler

Error Handler এর মধ্যে 4 টি Parameter Must দিতে হবে

- Global Error Handler একদম সবার শেষে লিখতে হবে
- Route Error Handler টি সকল Valid Route এর পরে হবে এবং Global Error Handler এর উপরে হবে

কোন Request এর Response এ Data পাঠানোর সময় কোন Error সংগঠিত হলে তার জন্য যেন Server Crash না করে তাই সবগুলো Operation , Async ব্যবহার করে এবং `try - catch` ব্যবহার করে করতে হবে এবং সবগুলো Error Handle করার জন্য একটি Global Error Handler তৈরী করতে হবে এবং সেখানে Error pass করতে হবে `next(error)` এর মাধ্যমে ।

User যদি এমন কোন Route এ হিট করে যেটি Exist করে না তাহলে তাকে একটি রেস্পন্স পাঠানোর জন্য একটি Error Handler তৈরী করতে হবে ।

```jsx
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
```

---

<div align="center">

**[⬅️ Back to Express & MongoDB Master](../README.md)**

</div>
