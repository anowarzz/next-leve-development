# 🚀 Node.js Core Modules - Learning Notes

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-13-red?style=for-the-badge)

_Deep Dive into Node.js Built-in Modules & Core APIs_

</div>

---

## 📚 Module Overview

This module explores the essential built-in modules that form the foundation of Node.js applications, including event handling, file system operations, streams, and server creation. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Event Module & Event-Driven Architecture
- ✅ File System (fs) Module for File Operations
- ✅ Buffer & Stream Concepts
- ✅ HTTP Module & Creating Servers
- ✅ Building Simple Applications with Core Modules

---

## 📝 My Learning Notes

<br>

## What is an event module?

Node.js asynchronous runtime হলেও ভিতরে **event-driven architecture** ইউজ করে।

- Event Listener → Event কে Listen করে
- Event Emitter → Event Trigger হলে Call back এর মাধ্যমে Response করে ।

যেখানে Node JS Event Loop এর মাধ্যমে Event এর জন্য Listen করে থাকে এবং Event হলে সেই অনুযায়ী Response করে থাকে ।

এই `events` module ইউজ করে আমরা আমাদের নিজের event system বানাতে পারি।

---

#### 🔹 Basic Concepts:

🔸 Node.js এর অনেক built-in modules নিজে নিজেই events emit করে (e.g. `fs`, `http` etc.)

🔸 আমরাও চাইলে custom events emit করতে পারি — `EventEmitter` ইউজ করে।

```jsx
const EventEmitter = require("events");
const myEmitter = new EventEmitter();
```

---

#### 🔹 Core Methods:

🔸 `.on(eventName, callback)` → Event শুনবে (listener attach)

🔸 `.emit(eventName, [...args])` → Event trigger করবে

🔸 `.once(eventName, callback)` → একবারের জন্য event শুনবে

🔸 `.off(eventName, callback)` বা `.removeListener()` → Event listener সরাবে

---

#### 🔹 Example:

```jsx
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

myEmitter.emit("greet", "Anowar"); // output: Hello, Anowar!
```

---

#### 🔹 Multiple Listeners:

একই নামের Event এর একাধিক Listener থাকতে পারে এবং তারা ভিন্ন ভিন্ন Output দিতে পারে ।

```jsx
myEmitter.on("done", () => console.log("Listener 1"));
myEmitter.on("done", () => console.log("Listener 2"));

myEmitter.emit("done");
// output:
// Listener 1
// Listener 2
```

---

#### 🔹 Use Case:

🔸 Logging

🔸 Notification system

🔸 Decoupled architecture

🔸 File uploads progress

🔸 Game or Chat events

---

#### 🔹 Special Properties:

🔸 `myEmitter.eventNames()` → All registered event names

🔸 `myEmitter.listenerCount('event')` → Number of listeners

---

#### 🔸 Advance Example (with `once`):

```jsx
myEmitter.once("init", () => {
  console.log("Only one time!");
});

myEmitter.emit("init"); // prints
myEmitter.emit("init"); // does nothing
```

---

#### 🔹 মনে রাখার মত:

✅ `events` module = custom event system

✅ `.emit()` দিয়ে event trigger করো

✅ `.on()` vs `.once()` – কখন কী দরকার সেটা বুঝে ইউজ করো

✅ Built-in modules গুলো ও internally `EventEmitter` extend করে ব্যবহার করে

<br/>

## Synchronous Way To Read & Write File

**`fs` (File System)**

fs Node.js এর built-in module, যার মাধ্যমে file system এর সাথে কাজ করা যায়।

---

#### 🔹 ✅ File Write (Synchronously)

```jsx
const fs = require("fs");
fs.writeFileSync("data.txt", "This is some data");
```

🔸 `fs.writeFileSync(filePath, data)`

- ফাইল না থাকলে নতুন ফাইল বানায়
- থাকলে পুরানোটা **overwrite** করে
- কাজ শেষে পরে লাইনেই পরের কোড চলে

---

#### 🔹 ✅ File Read (Synchronously)

```jsx
const fs = require("fs");

const content = fs.readFileSync("data.txt", "utf8");
console.log(content);
```

`fs.readFileSync(path, options)`

- ফাইল থেকে ডেটা **একবারেই পড়ে আনে**
- return করে: ডেটা (Buffer/utf8 string)

---

#### 🔹 ✅ Append File (Synchronously)

```jsx
const fs = require("fs");
fs.appendFileSync("data.txt", "\nNew line added");
```

🔸 `fs.appendFileSync()`

- আগের ডেটা রেখে **শেষে** যোগ করে

---

#### 🔹 ✅ Delete File (Synchronously)

```jsx
const fs = require("fs");
fs.unlinkSync("data.txt");
```

🔸 `fs.unlinkSync()`

- ফাইল ডিলিট করে, কাজ না করলে error throw করে

---

#### 🔹 ✅ Check File Exists (Synchronously)

```jsx
const fs = require("fs");

const exists = fs.existsSync("data.txt");
console.log(exists); // true or false
```

---

#### 🛠 Use Case (Example):

```jsx
const fs = require("fs");

const file = "log.txt";

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "=== LOG START ===\n");
}

fs.appendFileSync(file, "App started at " + new Date() + "\n");

const logs = fs.readFileSync(file, "utf8");
console.log(logs);
```

---

#### 🧠 মনে রাখার মত:

🔹 সব `Sync` ফাংশন **blocking** — মানে ওই লাইনে থেমে থাকে, পরের কোড তখনই চলে যখন আগের কাজ শেষ

🔹 ছোট স্ক্রিপ্ট, CLI tools, বা init scripts এর জন্য `Sync` version ভালো

🔹 বড় অ্যাপ বা heavy I/O হলে `async` version ব্যবহার করাই best practice

---

#### ✍️ Short Formula Recap:

```jsx
fs.writeFileSync(file, data); // Write
fs.appendFileSync(file, data); // Append
fs.readFileSync(file, "utf8"); // Read
fs.unlinkSync(file); // Delete
fs.existsSync(file); // Check Exists
```

<br/>

## Asynchronous Way to Read & Write Files

- ReadFile এর Callback এর মধ্যে Data থাকবে
- WriteFile এর Callback এর মধ্যে Data থাকেবে না

#### ✅ Write File (Async)

```jsx
fs.writeFile("file.txt", "text", (err) => {});
```

- নতুন ফাইল বানায় বা পুরাতাটা overwrite করে
- Non-blocking

---

#### ✅ Read File (Async)

```jsx
fs.readFile("file.txt", "utf8", (err, data) => {});
```

- ফাইল থেকে ডেটা পড়ে
- Callback-এ ডেটা আসে

---

#### ✅ Append File (Async)

```jsx
fs.appendFile("file.txt", "\nmore", (err) => {});
```

- আগের ডেটা রেখে শেষে যোগ করে

---

#### ✅ Delete File

```jsx
fs.unlink("file.txt", (err) => {});
```

---

#### ✅ File Exists Check

```jsx
fs.access("file.txt", fs.constants.F_OK, (err) => {});
```

---

#### 🔸 Modern Way (Promise + Async/Await)

```jsx
const fs = require("fs/promises");

await fs.writeFile("file.txt", "data");
const data = await fs.readFile("file.txt", "utf8");
```

---

#### 🧠 মনে রাখার মত:

- Async = Non-blocking
- Callback use করলে nested হয়ে যায়
- `fs/promises` = cleaner async/await syntax

<br/>

## Buffer and Streaming

Streaming হলো একটি Process যার মাধ্যমে আমরা Data কে এক জায়গা থেকে আরেক জায়গায় Transfer করতে পারি । এবং Streaming করার সময় Data এর অনেগুলো ভাগ নিয়ে একটি Package তৈরি করে এক জায়গা থেকে আরেক জায়গায় Transfer করি । এই এক একটি Package হলো Buffer .

Buffer is used in processing data piece by piece

**Buffer** হল Raw Binary Data নিয়ে কাজ করার জন্য Node.js এর একটি built-in class.

- Buffer হল temporary memory storage
- Binary data নিয়ে কাজ করার জন্য ব্যবহৃত হয়
- Fixed size থাকে

#### 🔹 Buffer Create:

```jsx
const buf = Buffer.from("hello");
console.log(buf); // <Buffer 68 65 6c 6c 6f>
console.log(buf.toString()); // 'hello
```

#### 🔹 Buffer Operations:

```jsx
buf.toString(); // Convert to string
buf.length; // Get size
buf[0]; // Access bytes
```

---

**Streaming** হল ডেটা processing এর একটি technique যেখানে ডেটা chunks আকারে process করা হয়।

- বড় ফাইল process করার জন্য efficient
- Memory efficient - পুরো ফাইল memory তে load করে না
- Real-time processing সম্ভব

#### 🔹 Main Stream Types:

- **Readable** - ডেটা read করার জন্য (file reading)
- **Writable** - ডেটা write করার জন্য (file writing)
- **Duplex** - Both read and write (TCP sockets)
- **Transform** - ডেটা modify করে / Reshape করে (compression)

#### ✅ Reading Stream Example:

```jsx
const fs = require("fs");
// creating read stream
const readStream = fs.createReadStream("./hello-world.txt", {
  encoding: "utf-8",
});

readStream.on("data", (chunk) => {
  console.log("Got chunk:", chunk);
});

readStream.on("end", () => {
  console.log("Finished reading");
});
// readStream error catch
readStream.on("error", (err) => {
  if (err) {
    throw new Error("Error", err);
  }
});
```

#### ✅ Writing Stream Example:

```jsx
const fs = require('fs');

coconst writeStream = fs.createWriteStream("./hello.txt", { encoding: "utf-8" });

readStream.on("data", (data) => {
  console.log(data);

  writeStream.write(data, (err) => {
    if (err) {
      throw new Error("Error", err);
    }
  });
});

writeStream.write('Some data\n');
writeStream.write('More data\n');
writeStream.end();
```

#### ✅ Pipe Example:

```jsx
const fs = require("fs");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);
```

#### 🧠 মনে রাখার মত:

- Buffer = Raw binary data handling
- Streaming = Large data processing in chunks
- Streams use Buffer internally
- Pipe() = Connect readable to writable stream
- Event based architecture

---

✅ Best practices:

- বড় ফাইলের জন্য always use streams
- Error handling properly implement করুন
- Stream events (.on()) proper handling করুন
- Memory leaks avoid করার জন্য streams properly close করুন

<br/>

## Making a basic logger app & Path module

Path module হল Node.js এর একটি built-in module যা file paths নিয়ে কাজ করার জন্য ব্যবহৃত হয়।

#### ✅ Path Module Features:

- **path.join()** - Multiple path segments একত্রিত করে
- **path.resolve()** - Absolute path generate করে
- **path.basename()** - File name extract করে
- **path.dirname()** - Directory path পায়
- **path.extname()** - File extension (.txt, .js etc) পায়

#### ✅ Code Example:

```jsx
const path = require("path");
const fs = require("fs");

const inputArguments = process.argv.slice(2);
const text = inputArguments.join(" ");

// creating a proper timestamp
const options = {
  year: "numeric",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const now = new Date();
const readableTimeStamp = now.toLocaleString(undefined, options);

const message = `${text} ${readableTimeStamp}\n`;
console.log(text);

if (!message) {
  console.log("❌ Please provide some text to log.");
  console.log("Example : node index.js Hello World!");

  process.exit(1);
}

const filePath = path.join(__dirname, "log.txt");
fs.appendFile(filePath, message, { encoding: "utf-8" }, () => {
  console.log("Log added successfully");
});
```

#### 🧠 মনে রাখার মত:

- Cross-platform compatibility নিশ্চিত করে
- File system operations এ path handling সহজ করে
- Path manipulation এর জন্য reliable methods প্রদান করে
- Operating system specific path separators (/,\) automatically handle করে

<br/>

## Creating a todo app with basic http server using nodejs

Created The Basic Server With Pure Node JS

```jsx
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.end("Welcome to the Todo App server");
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Todo server listening to port 5000");
});
```

#### Routing in node js

```jsx
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to the Todo App server");
  }

  if (req.url === "/todos" && req.method === "GET") {
    res.end("All todos Here");
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("Created a new todo");
  } else {
    res.end("Route not found");
  }
});
```

<br/>

## Set response headers

- Use `res.send()` used in **Express** — it's safer, smarter, and does the job well.
- Use `res.end()` when you're doing raw node js **manual/low-level** stuff in raw `http` module.

#### 📄 Response Headers (Node.js)

🔹 Header মানে: `Key: Value`

🔹 Headers আগে পাঠাতে হয়, body পরে

Header এর মাধ্যমে আমরা Response এর Type জানিয়ে দেই এবং বিভিন্ন Metadata পাঠাতে পারি ।

---

---

#### 🧠 Key Headers:

- `Content-Type`: ডেটার ধরন
- `Content-Length`: বডির সাইজ (byte)
- `Set-Cookie`: কুকি সেট করে
- `Location`: রিডাইরেকশনের জন্য
- `Cache-Control`: cache কন্ট্রোল
- `Access-Control-Allow-Origin`: CORS হ্যান্ডল করে

---

#### ⚠️ Rules:

- `res.writeHead()` → সব header একসাথে লিখা হয়
- `res.setHeader(k, v)` → একেকটা করে লিখা হয়

```jsx
// Using write head
res.writeHead(201, {
  "content-type": "text/plain",
  email: "anowarzz@mail.com",
});
// Using setHeaders
res.setHeader("content-type", "text/plain");
res.setHeader("email", "anowar@mail.com");

res.end("Hello");
```

- Headers পাঠানোর পর আর বদলানো যাবে না

---

#### 🔁 Full Example:

```jsx
res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ msg: "done" }));

// we can also send html with header
res.writeHead(201, {
  "content-type": "text/html",
});
res.end(
  `<h1>Hello World</h1>
    <h2>Hello World</h2>
    <h3>Hello World</h3>`
);
```

#### ✅ `JSON.stringify()`

👉 JS Object → JSON string

```jsx
const obj = { name: "Anowar", age: 25 };
const jsonStr = JSON.stringify(obj);
// result: '{"name":"Anowar","age":25}'
```

📦 সার্ভারে পাঠানোর সময় (POST body) এইরকম string লাগে।

---

#### ✅ `JSON.parse()`

👉 JSON string → JS Object

```jsx
const jsonStr = '{"name":"Anowar","age":25}';
const obj = JSON.parse(jsonStr);
// result: { name: "Anowar", age: 25 }
```

🌐 সার্ভার থেকে data আসলে string থাকে → তাই parse করে object বানাতে হয়।

<br/>

## Creating and Reading A ToDo using Postman

```jsx
// get all todos
if (req.url === "/todos" && req.method === "GET") {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });

  res.writeHead(201, {
    "content-type": "application/json",
  });

  res.end(data);
}

// ==> creating a todo <===
else if (req.url === "/todos/create-todo" && req.method === "POST") {
  let data = "";

  req.on("data", (chunk) => {
    data = data + chunk;
  });

  req.on("end", () => {
    const { title, body } = JSON.parse(data);
    const createdAt = new Date().toLocaleString();

    // reading all the todos
    const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedAllTodos = JSON.parse(allTodos);
    // pushing new todo
    parsedAllTodos.push({ title, body, createdAt });

    // writing the updated todo list
    fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
      encoding: "utf-8",
    });

    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ title, body, createdAt }, null, 2));
  });
}
```

<br/>

## Get Single ToDo with Query Params

```jsx
const url = new URL(req.url, https://${req.headers.host});
```

is used to parse the incoming request URL into a full URL object, so you can easily extract its parts — like pathname, query params, etc.

```jsx
url.pathname; // "/todos"
url.searchParams.get("limit"); // "10"
url.hostname; // "localhost"
url.port; // "5000"
```

GET A SINGLE TODO

```javascript
  else if (pathname.startsWith("/todo") && req.method === "GET") {
    const title = url.searchParams.get("title");

    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);

    const todo = parsedData.find((todo) => todo.title === title);


    const stringifyTodo = JSON.stringify(todo);

    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(stringifyTodo);
  }
```

<br/>

## Updating and Deleting Todo

```jsx
  // ==> updating a todo <===
  else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = url.searchParams.get("title");

    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { body } = JSON.parse(data);

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      parsedAllTodos = JSON.parse(allTodos);

      const todoIndex = parsedAllTodos.findIndex(
        (todo) => todo.title === title
      );
      parsedAllTodos[todoIndex].body = body;

      // writing the updated todo list
      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.writeHead(201, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify(
          { title, body, createdAt: parsedAllTodos[todoIndex].createdAt },
          null,
          2
        )
      );
    });
  }

  // ==> delete a todo <===
  else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const title = url.searchParams.get("title");

    const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedAllTodos = JSON.parse(allTodos);

    const todoToDelete = parsedAllTodos.find((todo) => todo.title === title);

    const todosAfterDelete = parsedAllTodos.filter(
      (todo) => todo.title !== todoToDelete.title
    );

    // writing the updated todo list
    fs.writeFileSync(filePath, JSON.stringify(todosAfterDelete, null, 2), {
      encoding: "utf-8",
    });

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(
      JSON.stringify(
        {
          message: "Todo Deleted Successfully",
          data: todoToDelete,
        },
        null,
        2
      )
    );  }

```

---

<div align="center">

**[⬅️ Back to Express & MongoDB Master](../README.md)**

</div>
