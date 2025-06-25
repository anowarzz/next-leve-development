# 🍃 Advanced Mongoose Concepts - Detailed Notes

<div align="center">

![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Advanced-orange?style=for-the-badge)

_In-depth Mongoose ODM Mastery with TypeScript_

</div>

---

## 📚 Advanced Topics Overview

This document contains detailed notes on advanced Mongoose concepts including validations, schema relationships, middleware, and query optimization techniques.

## 🎯 Advanced Concepts Covered

- ✅ Built-in & Custom Validations (min/max, custom functions)
- ✅ Third-party Validation Libraries (Zod integration)
- ✅ Schema Embedding & Referencing Patterns
- ✅ Population & Advanced Query Techniques
- ✅ Instance & Static Methods Implementation
- ✅ Middleware System (Pre/Post Hooks)
- ✅ Query Middleware & Virtual Properties
- ✅ Advanced Querying (Filter, Sort, Pagination)

---

## 📝 Detailed Learning Notes

<br>

## **Validations in Mongoose: Built-in and Custom validations [max/min]**

### \*\*\*\*

Client Side থেকে যখন কোন Data পাঠানো হয় তখন Mongoose সেই Data Validate করে এবং Data Valid হলে Behind the Scene এ MongoDB Driver এর মাধ্যমে সেই Data, Database এ Insert করে ।

Mongoose এর Validator গুলো মুলত Middleware Function যা pre save () এর মত করে কাজ করে ।

Mongoose এর Data Validation করার পদ্ধতি ৩ টি

- built-in validation
- custom validation
- third party validation library (Zod, Joi)

**Built-in Validators in Mongoose**

🔸 `required: true` → ফিল্ড অবশ্যই দিতে হবে

🔸 `minlength` / `maxlength` → স্ট্রিং লেন্থ চেক করে

🔸 `uppercase` / `lowercase` → স্ট্রিং Upper case এবং Lowe case করে দেয়

🔸 `min` / `max` → সংখ্যা কত কম বা বেশী হতে পারবে

🔸 `Unique: true` → কোন Value কে অবশই Unique হতে হবে

🔸 `enum` → নির্দিষ্ট কিছু মানের মধ্যেই থাকতে হবে

🔸 `match` → RegEx দিয়ে প্যাটার্ন মিলিয়ে দেখে , যেমন ইমেইল চেক)

```jsx
email: {
  type: String,
  required: true,
  match: /.+\@.+\..+/
}
```

---

### **🛠️ Custom Validator in Mongoose**

🔸 ফিল্ডে `validate` অপশন দিয়ে করা হয়

🔸 `validator` ফাংশন রিটার্ন true হলে valid

🔸 `message` দিয়ে error কাস্টমাইজ করা যায়

```jsx
username: {
  type: String,
  validate: {
    validator: function (value) {
      return value.length % 2 === 0; // জোড় সংখ্যার ইউজারনেম হতে হবে
    },
    message: "Username length must be even"
  }
}
```

---

---

🔹 **Multiple Validators Example**

{VALUE} এর মধ্যে Request থেকে আসা Value টা পাওয়া যায় ।

```jsx
age: {
 type: Number,
 required: true,
min: [18, `Age Must be at least 18, got {VALUE}`],
max: [60, `Age Must be less than 60, got {VALUE}`],
}
```

<br>

## **More About Built-in validation, Making Custom Validations & Third party Validator Package**

Mongoose এর Validator গুলোর মধ্যে আমরা আমাদের নিজেদের মত করে Error Message সেট করে দিতে পারি ।

```tsx
    firstName: {
      type: String,
      required: [true, `You don not have first name ?`],
      trim: true,
      minlength: [3, `First name must be at least 3 characters, got {VALUE}`],
      maxlength: [
        20,
        `First name must be less than 20 characters, got {VALUE}`,
      ],
    },
```

Request এর সাথে আসা Value এর Validation এর জন্য আমরা নিজেদের Custom Validator Function লিখতে পারি ।

- Custom Validation Function লিখার সময় সবসময় Normal Function ব্যবহার করতে হবে । কেননা Arrow function এ this ব্যবহার করা যায় না ।
- Custom validation Method এ আমরা Input Value টি পাই এবং সেই Value এর উপর আমাদের প্রয়োজন অনুসারে Validation করতে পারি এবং message এর মাধ্যমে Error message টি দেখাতে পারি । Custom validation Example :

```tsx
 email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, `Email must be unique`],
      lowercase: true,
      validate: {
        validator: function (v) {
          // regex for email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        },
        message: function (props) {
          return `${props.value} is not a valid email`;
        },
      },
    },
```

Validation এর জন্য আমরা চাইলে Third Party Package ও ব্যবহার করতে পারি । তেমন একটি Package হলো `Validator.js` `validator` মূলত string, email, regx , url ইত্যাদি validate করার জন্য ব্যবহার করা যায় ।

```tsx
 validate: [validator.isEmail, `Invalid email format {VALUE}`],
```

<br>

## **Validate using Zod**

Data Validation করার একটি Popular library হলো zod যা typescript এর সাথে বেশ compatible । আমরা Mongoose এর Schema Validation করার জন্যে সবসময় এই zod ব্যবহার করব ।

Mongoose এ Document এর Field গুলো By Default Optional থাকে আরে Zod এর ক্ষেত্রে Document এর Field গুলো By Default Required থাকে ।

🔹 **Zod কী?**

TypeScript-first data validation library.

👉 ডাটা validate করার জন্য ব্যবহার হয়

👉 রানটাইমে structure check করে

---

🔹 **স্কিমা তৈরি**

`z.object({...})` দিয়ে schema define করা হয়

```tsx
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});
```

---

🔹 **ডাটা validate করা**

```tsx
userSchema.parse({ name: "Anowar", age: 25 });
```

- ❌ invalid হলে error throw করে

---

🔹 **safeParse()**

error ছুঁড়ে না দিয়ে success/error ফ্ল্যাগ দেয়

```tsx
const result = userSchema.safeParse({ name: "A", age: "x" });
```

---

🔹 **প্রধান টাইপগুলো**

```tsx
z.string();
z.number();
z.boolean();
z.array(z.string());
z.enum(["USER", "ADMIN"]);
```

---

🔹 **Extra Rules**

```tsx
z.string().min(3).max(20);
z.number().min(18).max(60);
```

---

🔹 **optional ও default**

```tsx
z.string().optional();
z.string().default("Guest");
```

---

🔹 **Transform (ডাটা modify করা)**

```tsx
z.string().transform(val => val.toLowerCase(
```

<br>

## **Embedding in Mongoose**

Nested Object গুলোর Data Type Safety Ensure করার জন্য আমরা Embedded Schema ব্যবহার করতে পারি ।

✅ Sub-schema = Nested object/Document এর জন্য আলাদা schema

✅ Embedding = Parent schema-র ভেতরে sub-schema বসানো

### 🔸 Step 1: Sub-Schema তৈরি করা

Nested Schema এর জন্য \_id এবং version Key False করে দিতে হবে ।

```tsx
const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    country: String,
  },
  { _id: false, versionkey: false }
);
```

---

### 🔸 Step 2: Main Schema-তে Sub-Schema বসানো

```tsx
const userSchema = new mongoose.Schema({
  name: {
    type: String
    required: true,
  },
  age: Number,
  address: addressSchema  //  embedded sub-schema
});
```

এখন `address` একটা nested object হিসেবে থাকবে।

<br>

## **Referencing and Population in Mongoose**

### রেফারেন্সিং (Referencing)

একটি ডকুমেন্টের মধ্যে অন্য ডকুমেন্টের `ObjectId` রেখে দুটি Document এর মধ্যে কানেকশন তৈরি করাকেই **referencing** বলে।

এভাবে ডেটা আলাদা collection-এ থাকে , কিন্তু `ObjectId` দিয়ে connected থাকে

`ref` এর মধ্যে Model এর নামটি দিতে হবে যেটি model( ) এর মধে string আকারে থাকবে

```tsx
const User = model<IUser>("User", userSchema);
```

**Example:**

```jsx
const userSchema = new mongoose.Schema({
  name: String,
});

const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // User collection-এর সাথে রেফারেন্স
  },
});
```

---

### পপুলেশন (Population)

**populate()** মেথড ব্যবহার করে আমরা রেফারেন্স করা `ObjectId` কে আসল ডেটা দিয়ে **auto-replace** করতে পারি।

### 🧱 Example:

```jsx
Post.find()
  .populate('author') // author field-এর ObjectId এর জায়গায় User ডেটা চলে আসবে
  .then(posts => console.log(posts));

 🧠 ব্যাখ্যা:
```

- `populate('author')` `author` ফিল্ড-এর ObjectId কে নিয়ে `User` collection-এ গিয়ে match করে, তারপর সেই ডেটা বসিয়ে দেয়।

---

Why Use Reference ?

| যখন                                   | কারণ                  |
| ------------------------------------- | --------------------- |
| 🔄 ডেটা আলাদা রাখতে চাই               | separation of concern |
| 📈 বড় ডেটা বারবার শেয়ার করতে হয়    | avoid duplication     |
| 🔧 ডেটা independently update করতে চাই | scale/manage সহজ হয়  |

---

**Use Of Populate**

---

- যখন আমরা রেফারেন্স করা ডেটাটাও একসাথে দেখাতে চাই ।
- যেমন: post-এর সাথে author-এর নামও একসাথে দেখাতে চাই।

**🔧 Advanced: Selected Fields Populate**

```jsx
.populate('author', 'name email') // শুধু name ও email নিবে
```

---

---

## Nested Populate

```jsx
Post.find().populate({
  path: "author",
  populate: { path: "organization" },
});
```

👉 author-এর মধ্যে আবার organization রেফারেন্স করা থাকলে তাও পপুলেট করা যাবে

- Populate **runtime query** তে হয়, DB তে কিছুই change হয় না
- Query টাইমে performance খারাপ হতে পারে যদি nested/populate অনেক গভীর হয়

<br>

## **Built-in and Custom Instance Methods in Mongoose**

**Instance Methods কী?**

Mongoose এ Document এর উপর বিভিন্ন Operation করার জন্য Built-in Instance Methods আছে । এছাড়াও আমরা নিজেদের প্রয়োজন অনুসারে Custom Instance Methods তৈরি করে নিতে পারি ।

**Custom Instance Methods বানানোর ধাপগুলো হলো**

🔸 ১. Interface এ Method টাইপ ডিফাইন

- আমাদের যত Method লাগবে সেগুলোর টাইপ এবং রিটার্ন টাইপ Interface এ লিখতে হবে
- যেহেতু Database Operation, তাই Promise রিটার্ন করবে

```tsx
// user.interface.ts
export interface IUserMethods {
  isPasswordMatched(password: string): Promise<boolean>;
  isUserExists(email: string): Promise<IUser | null>;
}
```

🔸 **২. Model টাইপ তৈরি**

- Mongoose Model এর সাথে আমাদের Method গুলো যুক্ত করার জন্য Model টাইপ লাগবে

```tsx
export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;
```

🔸 **৩. Schema তে টাইপ যুক্ত করা**

- Schema ডিফাইন করার সময় Document টাইপ এবং Method টাইপ দুটোই দিতে হবে

```tsx
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
```

🔸 **৪. Method ইমপ্লিমেন্ট করা**

- Schema এর methods অবজেক্টে আমাদের Method গুলো লিখতে হবে
- এখানে Normal Function ব্যবহার করতে হবে (Arrow Function নয়)

```tsx
userSchema.methods.isPasswordMatched = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
```

- Service Layer এ Instance তৈরি করে Method গুলো Call করতে হবে
- Method Call করার সময় Await ব্যবহার করতে হবে
- this কীওয়ার্ড Document কে পয়েন্ট করে, তাই Arrow Function ব্যবহার করা যাবে না

Use Of Instance

```tsx
const loginUser = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new Error("User not found");

  const isValidPassword = await user.isPasswordMatched(payload.password);
  if (!isValidPassword) throw new Error("Invalid password");

  return user;
};
```

<br>

## **More About Instance Method**

Hashed User Password using instance method

<br>

## **Built-in and Custom Static Methods in Mongoose**

Instance মেথডে আগে একটি Document এর একটি Instance তৈরী করে নিয়ে এর পর তার উপর Instance Method গুলো Call করতে হয় ।

আর Static মেথডে সরাসরি Document এর উপর Method গুলো কল করা যায় । এক স্টেপেই কাজ করা যায় বলে আমরা বেশিরভাগ সময় Static Method ব্যবহার করব

Example

```tsx
// ==> Built In and custom static method
const password = await User.hashPassword(body.password);
body.password = password;
const user = await User.create(body);

// ==> Built In and custom instance method  <==

const user = new User(body) as any;
const password = await user.hashPassword(body.password);
user.password = password;

// await user.save();
```

<br>

## **Middleware in Mongoose: Pre and Post Hooks**

Mongoose এর অনেকগুলো Middleware রয়েছে যেগুলো খুবই গুরুত্বপূর্ণ ভূমিকা পালন করে । এগুলোকে Mongoose Hooks ও বলা হয় । Mongoose Middleware গুলো Database Operation এর আগে এবং পরে বিভিন্ন Method Apply করার সুযোগ দেয় । এক্ষেত্রে `Pre` এবং `Post` ব্যবহার করা হয় ।

Instance এবং Static Method তৈরী করলে সেগুলোকে বার বার Manually Call করতে হয় । এক্ষেত্রে Pre Hook ব্যবহার করলে সেটি Automatic ভাবে করা যায় ।

Mongoose এ বেশ কিছু রকমের Middleware রয়েছে ।

### Document Middleware

কোন Document Save বা remove করার আগে এবং পরে Middleware support দেয়

- schema.pre(”save”, func)
- schema.post(”save”, func)
- schema.pre(”remove”, func)
- schema.pre(”remove”, func)

### Query Middleware

কোন Query চালানোর আগে এবং পরে Middleware support dey

- schema.pre(”find”, func)
- schema.post(”find”, func)
- schema.pre(”findOne”, func)
- schema.pre(”findOne”, func)

### Aggregation Middleware

কোন Query চালানোর আগে এবং পরে Middleware support dey

- schema.pre(”aggregate”, func)
- schema.pre(”aggregate”, func)

### Model Middleware

Model Middleware যেটা Model Operation এর আগে এবং পরে Middleware support দেয় । Model Middleware গুলো বেশি ব্যবহার করা হয় Bulk Operation এর ক্ষেত্রে, যেমন একসাথে অনেকগুলো Document Insert করার সময়।

- schema.pre("insertMany", func)
- schema.post("insertMany", func)

```tsx
// Pre middleware for insertMany
userSchema.pre("insertMany", function (next) {
  console.log("Before inserting multiple documents");
  next();
});

// Post middleware for insertMany
userSchema.post("insertMany", function (docs) {
  console.log("After inserting documents:", docs);
});
```

Mongoose Middleware গুলো Model এ এর ফাইলে লিখতে হবে Schema এর নিচে । Middleware গুলো তে সবসময় Normal function লিখতে হবে , কারন Function এর মধ্যে সবসময় this ব্যবহার করতে হবে ।

<br>

## **Query Middleware in Mongoose**

**Middleware মানে হলো** Query চলার আগে বা পরে কিছু কাজ করানো যায়

Pre/Post hooks — `.find()`, `.update()`, `.delete()` ইত্যাদির আগে/পরে

---

🔸 **Pre Middleware (আগে)**

➡ কোনো query চলার আগেই কাস্টম লজিক রান করানো

```jsx
noteSchema.pre("find", function (next) {
  console.log("Query is about to run...");
  next();
});
```

🔸 **Post Middleware (পরে)**

➡ Query শেষ হবার পর কিছু করানো যায়

```jsx
noteSchema.post("find", function (docs, next) {
  console.log("Query finished.");
  next();
});
```

---

🔸 **Use Cases**

- লগ রাখার জন্য
- অথেনটিকেশন চেক
- query modify করা
- soft delete ইমপ্লিমেন্ট

<br>

## **Virtuals in Mongoose**

Virtuals in Mongoose হলো Schema properties যেগুলো MongoDB তে স্টোর হয় না, কিন্তু dynamically calculate হয়।

### Virtuals এর মূল বৈশিষ্ট্যঃ

- ডাটাবেসে স্টোর হয় না, রিকোয়েস্ট সময়ে calculate হয়
- Computed properties (যেমন fullName = firstName + lastName)
- Document Size অপটিমাইজ করে

```tsx
// Basic Virtual
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Enable virtuals in JSON
const userSchema = new Schema(
  {
    // fields
  },
  { toJSON: { virtuals: true } }
);

// Virtual Populate
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});
```

<br>

## **Filter, Sort, Skip, Limit In Mongoose**

Filter , Sort , Skip , Limit এর উদাহরন হলো

🔸 **Filter (find/query)**

➡ নির্দিষ্ট উজারের সব নোট দেখতে চাইলে

```jsx
Note.find({ userId: "123abc" });
```

🔸 **Sort**

➡ নতুন নোট আগে দেখতে চাইলে — date অনুযায়ী descending

```jsx
Note.find().sort({ createdAt: -1 });
```

🔸 **Limit**

➡ শুধু ৫টা লেটেস্ট নোট আনতে চাইলে

```jsx
Note.find().sort({ createdAt: -1 }).limit(5);
```

🔸 **Skip**

➡ প্রথম ৫টা বাদ দিয়ে পরের ৫টা দেখতে চাইলে

```jsx
Note.find().sort({ createdAt: -1 }).skip(5).limit(5);
```

🔸 **কম্বো ইউজ (pagination)**

➡ নির্দিষ্ট ইউজারের নোটগুলো paginate করে দেখতে

```jsx
const page = 2;
const limit = 5;
const skip = (page - 1) * limit;

Note.find({ userId: "123abc" }).sort({ createdAt: -1 }).skip(skip).limit(limit);
```

---

<div align="center">

**[⬅️ Back to Mastering Mongoose Concepts](./README.md)**

</div>
