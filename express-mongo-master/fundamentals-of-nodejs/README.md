# 🚀 Fundamentals of Node.js - Learning Notes

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-12-red?style=for-the-badge)

_Understanding Node.js Core Concepts & Architecture_

</div>

---

## 📚 Module Overview

This module covers the fundamentals of Node.js, including web architecture, JavaScript modules, and the Node.js runtime environment. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Web Architecture & Client-Server Model
- ✅ Frontend vs Backend Development
- ✅ Node.js Introduction & JavaScript Runtime
- ✅ Module Systems (CommonJS & ES Modules)
- ✅ Node.js Core Concepts

---

## 📝 My Learning Notes

<br>

## How the web works

Client Sends A Request to the Server and The Server sends a response . This model is called Request-Response Model or Client Server Architecture

- URL এর মধ্যে থাকা HTTP / HTTPS হলো Protocol . Client এবং Server এর মাঝে Communication এর Rules Regulation
- Website এর Real Address হচ্ছে তার IP Address
- DNS (Domain Name System) এর মাধ্যমে আমরা যেই URL Type করি তার Co Responding IP Address খুজে বের করে সেই Website এ পাঠানো হয় ।
- DNS Server হলো IP Address এবং Domain Name এর জন্য Phone Book বা Directory এর মত

- Web এ যখন Client এবং Server এর মাঝে Connection Build করা হয় তখন তার জন্য যে Rules & Regulation থাকে তাকে বলা হয় TCP / IP Socket Connection

<br/>

## Frontend vs Backend Development

Website এর UI এবং Visual অংশ নিয়ে কাজ করা হয় Front end Development এ এবং Data ও Logic Related কাজগুলো করা হয় Backend এ

- Frontend Development এর জন্য যেই ধরনের Technology ই ব্যবহার করা হোক না কেন যখন তা Client বা Browser এ আসবে তাতে HTML , CSS এবং Javascript থাকবে
- তবে Backend Server যেকোন Programming Language এ হতে পারে ।
- Javascript Backend এ ব্যবহার করা যায় Node Js এর মাধ্যমে ।

Website দুই রকম

- Static Website
- Dynamic Website

Static Website এ মুলত সব HTML CSS JS, Image সহ যত Resource আছে সব Backend এ Pre made রাখা হয় এবং সেখান থেকে সরাসরি Frontend এ পাঠানো হয় এবং Frontend থেকে সেটা Server করা হয় ।

Dynamic Website এ Content গুলো Pre made থাকে না । Client থেকে Request গেলে সেই অনুযায়ী Content বানানো হয়ে থাকে। বিভিন্ন Template Engine ও ব্যবহার হয়ে থাকে Data গুলো ব্যবহার করে Page বানাতে । এটা হলো Server Side Rendering

**Dynamic Website Using API**

Client Request করবে Server এর মাধ্যমে Database এর মধ্যে এবং Server , Client এর Requirement অনুসারে সেই Data কে Modify করবে এবং সেই Raw Data Browser এ সেন্ড করবে JSON Format এবং Browser এ গিয়ে সেই Data use করে Page Build হবে । অর্থাৎ Template Engine এর কাজ Browser করবে । যা হলো Client Side Rendering .

API ব্যবহার করার সুবিধা হলো Browser , Mobile Apps, Windows App ইত্যাদি Cross Platform ব্যবহার করা যায় । যা Static website এর বেলায় হয়না ।

<br/>

## Why Node.js was invented

Different Javascript Engine

Chrome → V8 Engine - best

Firefox → Spider Monkey

Safari → JavascriptCore

[NODE-JS OVERVIEW](https://www.notion.so/NODE-JS-OVERVIEW-2053bdef7401801198cdc97e2a34ce15?pvs=21)

<br/>

## High Level Overview of Node.js Architecture

Node Js Is Built On Even Driven Architecture

Node JS বিভিন্ন Event Emitter এর মাধ্যমে Event Emit করে রাখে এবং Event Listener এর মাধ্যমে সেই Event গুলো কে Listen করে থাকে । যখন Event Emit বা Call হয়ে থাকে সেই অনুসারে একটি Callback Function কে Call করে দেয় যা মুলত সেই Event এর Against এর একটি Response

#### Event Loop

Event is the heart of Node JS which makes the asynchronous programming possible in Node JS

- [ ] Most Of the tasks of Node JS happens in Event Loop
- [ ] Received events and execute callback associated with each callback function
- [ ] Offloads the CPU intensive tasks to Thread Pool

To Understand Event Loop we have to know about 2 things

1. Process
2. Threads

**Process**

আমরা যখন কোন Code লিখি তা হলো মুলত অনেকগুলো Set of Instruction যা আমাদের HDD/SSD Disk এর মধ্যে থাকে । সেই Instruction গুলো কে Execute করার জন্য Ram এর মধ্যে Load করে Run করাতে হয় অর্থাৎ একে একটি Environment এর মধ্যে আসতে হয় । এইভাবে একটি Program সেই Environment এর মধ্যে গিয়ে Run হওয়া কে Process বলে যা হয়ে থাকে Ram এর মধ্যে

একই সাথে অনেকগুলো Process চলতে পারে ।

**Threads**

Thread is a unit of execution

একটি Process একবারেই সম্পুর্ন টা Execute হবে না । এটি unit by unit অথবা Chunk by chunk execute হবে । Threads এর মধ্যে থাকে Stack, Register, Program Counters

Node JS নিজেই একটি Process কারন আমাদের Program গুলো Node Js এর মধ্যেই Run হয়ে থাকে । আর Node JS হলো Single Threaded । Node Js এর Code Execution Process টি হলো

Call back এর মধ্যে কোন Heavy বা intensive কাজ থাকলে event loop সেগুলোকে thread pool বা worker threads এর কাছে পাঠিয়ে দেয় ।

Node JS, Event Loop এর মাধ্যমে Single Threaded হওয়া সত্ত্বেও Non Blocking ভাবে Client Request Handle করতে পারে

Node JS এর যেই Single Thread টি থাকে সে শুধুমাত্র Request গুলো Receive করে তার Workers এর কাছে Handover করে দেয় । Workers কাজ সম্পন্ন করে আবার Event Loop এর মাধ্যমে কাজ Main Thread এ ফেরত দেয় ।

**তবে কোন CPU intensive work হলে সেটা Node Js এর worker বা API গুলো Handle করতে পারে না । সেই কাজ Main Thread কেই করতে হয় । যার কারনে ঐ কাজ শেষ না হওয়া পর্যন্ত Node Js ব্লকিং অবস্থায় থাকবে ।**

**যে কারনে Node Js CPU Intensive কাজের জন্য উপযুক্ত নয় ।**
<br/>

## Single threaded node.js

**Single Threaded Server Vs Multi Threaded Server**

আগে server এবং Client একসাথে থাকত অর্থাৎ Backend এর মধ্যেই HTML CSS JS থাকত ।

কিন্তু বর্তমানে Modern application এ আমরা Pure backend তৈরী করি যা আলাদা থাকে । যেখান থেকে JSON আকারে Response পেয়ে থাকি যার ফলে আমরা Frontend এ বা Client side এ Cross platform compatibility পেয়ে থাকি ।

যার মাধ্যমে আমরা একই Server দিয়ে Browser, IOS / Android, Desktop app ইত্যাদি তৈরী করতে পারি ।

Server এর মধ্যে যেসব ধরনের কাজ হয়ে থাকে সেগুলো হলো

- I/O Intensive Task
- CPU Intensive Tasks

যেসব Programming Language এর Backend Server , Multi Threaded হয়ে থাকে । সেখানে একই সময়ে প্রতিটা Request এর জন্য আলাদা আলাদা Thread এর মধ্যে কাজ গুলো ভাগ হয়ে যায় । যার ফলে I/O operation হোক বা CPU operation হোক কোন Request অন্য user এর Request কে Block করে না ।

**Multi Thread Limitation**

- Limited Number of Threads —> If the user request exceeds the number of threads then the next request has to wait

**Multi Thread Limitation Solving Ways**

- Horizontal Scaling
- Vertical Scaling

**How Node JS Handle Multiple Request ?**

Node Js এর Single Thread তার মধ্যে আসা Request গুলো কে Thread Pool এর কাছে পাঠিয়ে দেয় এবং কাজ শেষ হলে Thread pool আবার সেই Request কে main thread এর কাছে দিয়ে দেয় ।

যাকে বলা হয় NON Blocking I/O । আর এই কাজটি করে থাকে Asynchronous way তে । I/O operation এর কাজগুলো এভাবে সম্পন্ন হয়ে থাকে Event Loop এর মাধ্যমে । তবে যদি কোন CPU Intensive কাজ হয় তাহলে সেই কাজ Main Thread কেই করতে হয়, সেটা Thread pool করতে পারেনা ।

যেটা Node Js এর একটা Drawback । তবে এখন এটারও সমাধান আছে Node Js এর মধ্যে Multi Threading Introduce করলে এই সমস্যা সমাধ্যান করা যায় ।

<br/>

## How event loop works

Node Js এর Single Thread বা Main Thread থেকে Request গুলোকে Worker Thread Pool এর কাছে পাঠানো বা সেখান থেকে কাজ শেষ হলে একটা call back এর মাধ্যমে main thread কে জানানো , এই কাজগুলো করে থাকে Event Loop ।

Event Loop একটি Event Driven Architecture এ চলে ।

Event Loop সব সময় watch করতে থাকে যে কোন Event Trigger হলো কিনা। হলে সে ঐ কাজটাকে Thread pool দিয়ে করিয়ে নিবে ।

Event Loop Completes the tasks in 4 phase

কোন একটি Process Run হলে Event Loop চালু হয়ে যায় এবং ঘুরতে থাকে । তখন সাথে সাথে একটি Callback queue চালু হয় ।

Inside callback queue

—> Start ←—

1. Expired Timer Callback (SetTImeOut)
2. I/O Polling & Callbacks (Input /Output, File system read)
3. Set Immediate Callbacks
4. Close Callbacks ( যেই Function গুলো দিয়ে Event circle টা কে Close করা যায় )

Callback queue ছাড়াও আরো দুই ধরনের Queue আছে

- `process.nextTick()` queue
- Other Microtask queue

এই Queue এর কাজগুলো Callback queue এর মাঝখান দিয়েই কোন সময় Execute হতে পারে ।

<br/>

## Install node.js using fnm

যে কোন Application এর version এর মধ্যে তিনটি অংশ থাকে । কোন Update এর সময় এই তিনটার কোন একটা তে Update আনা হয় ।

20.11.7

এখানে 20 হলো Major, 11 হলো Minor এবং 6 হলো Patch Update এর জন্য version

কোন Major change আসলে যেটি আগের Version গুলো তে নাই তাহলে Major version change হবে ।

কোন existing feature এর মধ্যে কোন feature update or improve হলে minor version change হবে ।

কোন small security update যা কোন feature এর সাথে related না বা improvement এর সাথে related না তাহলে তাকে patch version এর মধ্যে আসবে ।

বিভিন্ন Project এর মধ্যে Node Js এর বিভিন্ন version ব্যবহার করা সহজ করতে আমরা fnm বা fast node manager ব্যবহার করতে পারি ।

<br/>

## Modular system in node.js

একাধিক File এর মধ্যে Javascript লিখে তা Application এ ব্যবহার করলে তা ম্যানেজ করা এক সময় অনেক কঠিন হয়ে যায় । এর সমাধানে IIFE ব্যবহার করা হয় ।

**IIFE** stands for:

> Immediately Invoked Function Expression

#### 🧩 Why use IIFE?

1. **Avoid polluting global scope**
2. **Create private variables**
3. Useful in **modular or isolated code blocks**

কিন্তু কোডবেজ বড় হওয়ার সাথে সাথে IIFE এর ও সীমাবদ্ধতা আছে যার জন্য Modular System Introduce করা হয়েছে ।

Modular System এ দুইরকম Concept রয়েছে

- Common Js
- Esm Module

একটি File এর কোড আরেকটি File এর মধ্যে Import / export করে ব্যবহার করার জন্য Modular Pattern ব্যবহার করা হয় ।

Common Js মুলত Backend এ Node JS এর সাথে বেশি ব্যবহার করা হয় এবং ESM MODULE ব্যবহার করা হয় Frontend এ React এর সাথে । তবে backend এও ESM ব্যবহার করা যায় Node 14 > থেকে ।

**Node JS Module Type**

1. Local Modules ( We create )
2. Built In Modules ( come with node js)
3. Third Party Modules ( create by others)

## Explore commonjs module

module.export এর মাধ্যমে এক ফাইল থেকে আরেক ফাইলে Code export করতে পারি এবং Require এর মাধ্যমে ব্যবহার করতে পারি ।

Module এর মধ্যে initially , export নামের একটি empty object থাকে এবং আমরা যেই value export করি সেই object এর মধ্যে মুলত আমদের export করা value টা set হয়ে যায় ।

```jsx
const { a, add, b } = require("./commonJS-module2.js");

console.log(a);
console.log(add(2, 4));
console.log(b);
```

```jsx
const a = 20;
const add = (param1, param2) => param1 + param2;
const b = 25;
module.exports = { a, add, b };
```

## Name exports, name aliasing & index export

---

#### 🔶 Named Export

🔹 এক ফাইলে একাধিক ফাংশন বা ভেরিয়েবল আলাদা আলাদা নামে export করা হয়

🔹 Import করার সময় export করা নামের **exact match** লাগে

```jsx
// utils.js
export const sayHi = () => console.log("Hi");
export const sayBye = () => console.log("Bye");

// use
import { sayHi, sayBye } from "./utils";
```

---

#### 🔶 Name Aliasing

🔹 Export বা import করার সময় নাম পরিবর্তন করা যায়

🔹 নাম conflict বা স্পষ্টতার জন্য aliasing করা হয়

```jsx
// export এ alias
export { sayHi as greet, sayBye as farewell };

// import এ alias
import { sayHi as hello } from "./utils";
```

---

#### 🔶 Index Export (Barrel File)

🔹 এক ফোল্ডারে যতগুলো ফাইল আছে, সবগুলোকে centralized export করার জন্য `index.js` ফাইল ব্যবহার করা হয়

🔹 এই ফাইলে প্রতিটি ফাইল থেকে export করা সব ফাংশন/ভেরিয়েবল আবার export করা হয়

🔹 Import করার সময় সরাসরি ওই ফোল্ডার থেকে import করা যায় (path ছোট হয়, code clean হয়)

```jsx
//add.js
const add = (param1, param2) => param1 + param2
module.exports = {
    add
};

// substract.js
const substract = (param1, param2) => param1 - param2 ;
module.exports = {
    substract
}
};

// index.js (barrel file)
const {add} = require("./add")
const {substract} = require("./substract")

module.exports = {
    add,
    substract
}

// usage in another file
import { getUser, getProduct } from "./"; // "./" means current folder index.js
console.log(getUser(), getProduct());

```

---

### 🧠 মনে রাখার মত

- `Named Export` এ import নাম **exact match** করতে হয়
- `Index Export` করলে import path ছোট হয়, maintenance সহজ হয়

---

#### ✳️ Summary Formula

```jsx
Export = আলাদা আলাদা export
Aliasing = export/import এ নাম বদলানো
Index Export = barrel file দিয়ে centralized export
```

##### 🔹 CommonJS (CJS)

- `require()` দিয়ে import হয়
- alias করতে হলে destructuring দিয়ে নাম বদলাতে হয়
- export এ কোনো alias syntax নেই

```jsx
const { sayHi: hello } = require("./utils");
```

---

#### 🔹 ES Modules (ESM)

- `import`/`export` syntax use হয়
- export এবং import দুই জায়গায়ই `as` দিয়ে alias করা যায়
- syntax বেশি clean এবং declarative

```jsx
export { sayHi as greet } from "./utils";
import { sayHi as hello } from "./utils";
```

<br/>

## IIFE a Module Wrappe

Browser এ Javascript Run করলে আমরা Window নামের Object এর Access পেয়ে থাকি যার মধ্যে Javascript এর সকল Properties এবং Method থাকে আর Node JS এ Run করলে সেই Object এর নাম হলো Global

SetTimeOut এবং অন্যান্য Function গুলো Global Object এর মধ্যে থাকলেও `require, module` এগুলো Global Object এর মধ্যে থাকে না। এগুলোর Access আমরা তাহলে কিভাবে পাই ?

এগুলোকে Node JS Code Run করার সময় IIFE function এর Parameter হিসেবে দিয়ে দেয় ।

#### 🔹 IIFE (Immediately Invoked Function Expression)

---

IIFE হলো এমন একটা ফাংশন, যেটা লেখার পরপরই Call করা হয়।

এইভাবে ফাংশনের ভেতরে আলাদা একটা স্কোপ তৈরি হয়, বাইরের কোন ভেরিয়েবলের সাথে মিশে যায় না।

```jsx
(function () {
  console.log("This is an IIFE function");
})();
```

---

#### 🔸 কেন ব্যবহার করা হয়?

- বাইরের ভেরিয়েবল থেকে আলাদা রাখার জন্য
- অস্থায়ী কাজ বা সেটিংস করার জন্য
- ES6 আসার আগ পর্যন্ত মডিউল সিস্টেম না থাকায়, এটাকেই অনেকটা মডিউলের মত ব্যবহার করা হতো

---

#### 🔸 আধুনিক IIFE (arrow function):

```jsx
(() => {
  console.log("চালু হয়েছে (arrow function)");
})();
```

---

#### 🔹 Module Wrapper (Node.js)

---

Node.js যখন কোনো ফাইল চালায়, তখন সেটা অটোমেটিকভাবে একটা ফাংশনের ভিতরে ঢুকিয়ে ফেলে।

এটা একটা IIFE-এর মতোই কাজ করে। এর ফলে ফাইলের কোড গ্লোবাল স্কোপে গিয়ে মিশে যায় না।

এবং সেই Function এর Parameter এর মধ্যে exports , require, module এগুলো Add করে । এগুলো কিন্তু Global Object এর মধ্যে থাকে না ।

```jsx
(function (exports, require, module, __filename, __dirname) {
  // এইখানে ফাইলের সব কোড চলে
})(exports, require, module, __filename, __dirname);
```

---

#### 🔸 এই ফাংশনের ভিতরে যা থাকে:

- `exports`: কী বাইরে পাঠাবে
- `require`: কী কী ফাইল/প্যাকেজ আনবে
- `module`: পুরো মডিউল সম্পর্কিত তথ্য
- `__filename`: এই ফাইলের নাম
- `__dirname`: ফাইলের অবস্থান

---

#### 🔸 কেন এই সিস্টেম?

- প্রত্যেকটা ফাইল আলাদা করে আলাদা স্কোপে রাখা যায়
- এক ফাইলের ভেতরের জিনিস অন্য ফাইলের সাথে মিশে না
- মডিউল সিস্টেম বিল্ড করা সহজ হয়

---

#### ✳️ মনে রাখার মতো

```coffeescript

IIFE = সঙ্গে সঙ্গে Run হয় এমন ফাংশন, স্কোপ আলাদা রাখে
Module Wrapper = Node.js নিজে থেকেই প্রতিটা ফাইল IIFE-এর মত চালায়

```

<br/>

## \*ES module

Javascript Had no built in modular system but after node version 14 Javascript has its own modular system

#### 🔹 ES Modules (ESM)

---

ES Modules বা ESM হলো JavaScript এর নতুন মডিউল সিস্টেম, যেটা **ES6 (2015)** থেকে এসেছে।

এইটা এখন **Browser** এবং **Node.js** – দুই জায়গাতেই Standard Way হিসেবে ব্যবহার করা হয়।

---

#### 🔸 Import ও Export কেমন করে?

#### ✅ Named Export:

```jsx
// math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
```

```jsx
// main.js
import { add, sub } from "./math.js";
```

#### ✅ Export Aliasing:

```jsx
export { add as addition, sub as subtraction };
```

#### ✅ Import Aliasing:

```jsx
import { addition as sum, subtraction as minus } from "./math.js";
```

#### ✅ Default Export:

```jsx
// greet.js
export default function greet(name) {
  return `Hello, ${name}`;
}
```

```jsx
// main.js
import greet from './gree
```

---

#### 🔸 Browser-এ কিভাবে চালাবো?

```html
<script type="module" src="main.js"></script>
```

ESM ব্যবহারের সময় `type="module"` অবশ্যই দিতে হয়।

---

#### 🔸 Node.js-এ কিভাবে চালাবো?

#### ✅ `.mjs` extension ব্যবহার করতে হবে

---

#### 🔸 ESM vs CommonJS – মুখ্য পার্থক্য

| বিষয়             | ESM                      | CommonJS         |
| ---------------- | ------------------------ | ---------------- |
| Export           | `export`                 | `module.exports` |
| Import           | `import`                 | `require()`      |
| Async Support    | হ্যাঁ (top-level await)  | না               |
| Static Structure | হ্যাঁ                    | না               |
| ব্যবহার কোথায়    | নতুন JS (Browser + Node) | পুরনো Node.js    |

---

#### ✳️ মনে রাখার মতো

```
ESM = Modern, standard module system
✅ import/export keywords
✅ Browser + Node.js compatible
✅ Static, faster, supports top-level await
```

🔹 ESM ফাইলে কোনো IIFE থাকে না
🔹 তাই require, module, exports, **dirname, **filename — এগুলো থাকে না
🔹 ESM ফাইল নিজেই এক ধরনের scoped module
🔹 সবকিছু import/export এর মাধ্যমেই access করতে হয়


<div align="center">

**[⬅️ Back to Express & MongoDB Master](../README.md)**

</div>