# 🍃 Mastering Mongoose Concepts - Learning Notes

<div align="center">

![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-17-blue?style=for-the-badge)

_Advanced MongoDB ODM with TypeScript_

</div>

---

## 📚 Module Overview

This module covers Mongoose ODM (Object Data Modeling) library for MongoDB, including schema design, data validation, CRUD operations, and project structuring. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Mongoose ODM Fundamentals
- ✅ Schema Design & Data Validation
- ✅ CRUD Operations & Methods
- ✅ Project Structuring Patterns
- ✅ TypeScript Integration

---

<br/>

## What is Mongoose and Why Use It with MongoDB

**What is Mongoose ??**

A Powerful **Object Data Modeling (ODM)** Library For MongoDB

Mongoose মূলত Data এর Validity নিশ্চিত করে । আমরা যেই ধরনের Data Model তৈরী করি ঠিক সেই Type এর Data Database এ যাচ্ছে কিনা Mongoose সেটা নিশ্চিত করে । সেইম Model এর Data না হলে Mongoose - সেই ডাটা MongoDB তে রাখতে দিবে না ।

MongoDB এবং Mongoose এর Method গুলো :

| MongoDB Command       | Mongoose Equivalent                      |
| --------------------- | ---------------------------------------- |
| `find()`              | `Model.find()`                           |
| `findOne()`           | `Model.findOne()`                        |
| `insertOne()`         | `Model.create()` বা `new Model().save()` |
| `insertMany()`        | `Model.insertMany()`                     |
| `updateOne()`         | `Model.updateOne()`                      |
| `updateMany()`        | `Model.updateMany()`                     |
| `replaceOne()`        | `Model.replaceOne()`                     |
| `deleteOne()`         | `Model.deleteOne()`                      |
| `deleteMany()`        | `Model.deleteMany()`                     |
| `findOneAndUpdate()`  | `Model.findOneAndUpdate()`               |
| `findOneAndDelete()`  | `Model.findOneAndDelete()`               |
| `findOneAndReplace()` | `Model.findOneAndReplace()`              |

#### Why We Should Use Mongoose ?

- Simplifies MongoDB Operations with built in schema validation
- Reduces the boilerplate code for database operations
- Model Creation
- Data Validation
- Querying
- Middleware Support with pre / post operations
- Population

<br/>

## Creating First Mongoose Schema and Model

- **I**n Mongoose, a Schema defines the structure of documents within a MongoDB collection.

It specifies the fields, their types, default values, validation rules, and other constraints.

We can think it as a blueprint for how data should be stored in the database.

- A Model is a constructor compiled from a Schema.

It provides an interface to interact with the database — allowing us to perform operations like `find, create, update, delete` on documents.

> "Schema defines the structure; Model uses that structure to perform real operations on the database.”

#### 🔸 Schema কী?

একটা Schema হলো Model এর Blue Print বা **structure**—একটা ডকুমেন্টে কী কী ফিল্ড থাকবে, তার টাইপ, ভ্যালিডেশন ইত্যাদি সব কিছু এখানে define করা হয়। Mongoose এর Type গুলো Capital Letter দিয়ে লিখতে হবে ।

```typescript
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { versionKey: false, timestamps: true }
);
```

#### 🔸 Model কী?

Model হলো Schema-এর উপর ভিত্তি করে বানানো **MongoDB collection-এর interface** — যেটার মাধ্যমে আমরা `find()`, `create()`, `update()`, `delete()` ইত্যাদি করতে পারি। Model এর নাম Capital Letter এর হবে কারন এটি একটি Class বা Builder এর মত কাজ করে

```typescript
export const User = model<IUser>("User", userSchema);
```

এখন `User` হলো Model → এখান থেকে আমরা ইউজারদের নিয়ে query করতে পারি:

```typescript
User.find();
User.create({
  firstName: "Anowar",
  lastName: "Hossain",
  email: "anowar@example.com",
  password: "securepassword",
  role: "user",
});
User.findById(id);
```

<br/>

## Understanding Data Types and Required Fields in Schema

Mongoose এর মাধ্যমে আমরা বিভিন্ন রকম Data Type Define করে দিতে পারি ।

| Mongoose Type | Description                | Example                              |
| ------------- | -------------------------- | ------------------------------------ |
| `String`      | Text                       | name: String                         |
| `Number`      | Integer/Float              | age: Number                          |
| `Boolean`     | true/false                 | isActive: Boolean                    |
| `Date`        | Time-stamp                 | createdAt: Date                      |
| `Array`       | List of values             | tags: [String]                       |
| `ObjectId`    | Reference ID               | user: mongoose.Schema.Types.ObjectId |
| `Mixed`       | Anything (not recommended) | meta: mongoose.Schema.Types.Mixed    |

Type এর Definition Short Hand এ না লিখে একটি Object এর মধ্যে দেয়া উত্তম যার ফলে আমরা Type এর সাথে আরো কিছু Constraints Add করে দিতে পারি ।

```tsx
 title: String, // ❌
 title : {type: String, required: true} ✔
```

Type Define করা ছাড়া ও আমরা যেসব Constraints Add করতে পারি সেগুলো হলো

`required, default, unique, enum, min, max, minLength, maxLength, match, validate, trim, lowercase, uppercase, immutable, select, alias, get/set`

<br>

## Create and Save a Note, Get All and Single Notes

Mongoose ব্যবহার করে Document Create করার দুইটি পদ্ধতি আছে

✅ Way 1: `Model.create()` — One-liner

```typescript
User.create({
  firstName: "Anowar",
  lastName: "Hossain",
  email: "anowar@example.com",
  password: "securepassword",
  role: "user",
});
```

✅ Way 2: `new Model()` + `.save()`

```typescript
const user = new User({
  firstName: "Anowar",
  lastName: "Hossain",
  email: "anowar@example.com",
  password: "securepassword",
  role: "user",
});
await user.save();
```

Mongoose ব্যবহার করে Document Find করার জন্য তিনটি পদ্ধতি মুলত ব্যবহার করা হয়ে থাকে ।

✅ 1. `find()` — Returns **all matching documents** in an **array**
🔸 If no match is found, it returns an empty array `[]`.

```typescript
User.find({ firstName: "Anowar" }); // can use any field as condition
```

✅ 2. `findOne()` — Returns **first matched document** (object)

```typescript
User.findOne({ email: "anowar@example.com" }); // can use any field as condition
```

✅ 3. `findById()` — Finds by `_id` only

শুধু মাত্র MongoDB এর Object Id দিয়ে একটি মাত্র Document খোজার জন্য

```typescript
User.findById("665aef7c0b8ad5e0fdcf1111"); // can find by only using _id
```

<br>

## Update and Delete a Note, Schema Options: timestamps, versionKey

### 🔧 Update Methods in Mongoose

Mongoose এ Document Update করার জন্য কয়েকটি Method রয়েছে ।

🔹 **findByIdAndUpdate(id, update, options)**

🔸 `_id` দিয়ে খুঁজে update করে

🔸 `{ new: true }` দিলে updated doc return করে

```typescript
const updatedUser = await User.findByIdAndUpdate(
  userId,
  {
    firstName: "Updated Name",
    role: "admin",
  },
  {
    new: true,
  }
);
```

🔹 **updateOne(filter, update, options)**

🔸 প্রথম matching doc update করে

```typescript
User.updateOne({ _id: id }, { firstName: "New Name" });
```

🔹 **updateMany(filter, update, options)**

🔸 একাধিক doc update করার জন্য

```typescript
User.updateMany({ role: "user" }, { role: "member" });
```

🔹 **findOneAndUpdate(filter, update, options)**

🔸 যেকোনো field দিয়ে খুঁজে update

```typescript
User.findOneAndUpdate(
  { email: "anowar@example.com" },
  { firstName: "Updated" }
);
```

---

### 🗑️ Delete Methods in Mongoose

Mongoose এর মাধ্যমে Document Delete করার যে পদ্ধতি গুলো আছে তা হলো

🔹 **findByIdAndDelete(id)**

🔸 `_id` দিয়ে delete করে

```typescript
const userId = req.params.id;
User.findByIdAndDelete(userId);
```

🔹 **deleteOne(filter)**

🔸 প্রথম matching doc delete করে

```typescript
User.deleteOne({ email: "user@example.com" });
```

🔹 **deleteMany(filter)**

🔸 সব matching doc delete করে

```tsx
User.deleteMany({ role: "inactive" });
```

🔹 **findOneAndDelete(filter)**

🔸 যেকোনো field দিয়ে খুঁজে delete

```typescript
User.findOneAndDelete({ firstName: "anowar" });
```

Mongoose এ Schema এর মধ্যে Data Type গুলো Define করার পর Second Parameter এর মধ্যে বিভিন্ন option set করে দেয়া যায় । যেমন `{ versionKey: false , timeStamp: true}`

<br>

## Project Structuring: Models, Routes, Services, Controllers

Express Application এর জন্য আমরা মূলত দুই ধরনের Design Pattern Follow করি ।

1. **MVC ( Model View Controller )**
2. **Modular**

MVC Pattern এ Route, Model, View, Controller গুলো আলাদা আলাদা করে রাখা হয় । তাই কোন একটি Route এর একটি Feature পরিবর্তন করতে হলে একবার যেতে হয় Routes এ , একবার Controller এ । এভাবে বেশি সময় ব্যয় হয় এবং এই Process টা বিরক্তিকর ।

তাই এসব সমস্যার সমাধান হিসেবে বর্তমানে **MODULAR PATTERN** ব্যবহার করা হয় । এই Pattern এ প্রতিটি Feature কে একটি একটি Module হিসেবে ভাগ করা হয় এবং সেই Feature এর Route, Controller, Interface , Schema ইত্যাদি সবকিছু একসাথে Tuple করে এ রাখা হয় ।

#### Benefits Of Using Modular Pattern ⇒

- Scalability
- Maintainability
- Better Refactoring
- Efficient development

#### Rules / Principle To Follow ⇒

- DRY - Don’t Repeat Yourself
- Fat Model / Thin Controller

#### Steps Of Modular System With TypeScript

1. Interface
2. Schema
3. Model
4. DB Query

<br/>

## Integrating Typescript with Mongoose And Making User Model

Schema এবং Model তৈরী করার পুর্বে আমাদেরকে Typescript ব্যবহার করে Interface তৈরী করে নিতে হবে ।

এরপর Schema এবং Model তৈরী করার সময় Type হিসেবে উক্ত Interface কে ব্যবহার করতে হবে । নিচে User এর জন্য Interface , Schema এবং Model তৈরী করার উদাহরন দেয়া হলো

```typescript
// user.interface.ts
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
```

```tsx
// user.model.ts

import { model, Schema } from "mongoose";
import { IUser } from "./../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const User = model<IUser>("User", userSchema);
```
