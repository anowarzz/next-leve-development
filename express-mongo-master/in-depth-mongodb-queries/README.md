# 🍃 In-Depth MongoDB Queries - Learning Notes

<div align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Queries](https://img.shields.io/badge/Queries-Advanced-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-15-red?style=for-the-badge)

_Mastering MongoDB Query Operations & CRUD_

</div>

---

## 📚 Module Overview

This module covers comprehensive MongoDB querying techniques, from basic CRUD operations to advanced querying with operators and aggregation principles. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ MongoDB Basics & Core Concepts
- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Query & Comparison Operators
- ✅ Logical Operators & Complex Queries
- ✅ Update Operations & Modifiers
- ✅ Advanced Query Techniques

---

<br>

## MongoDB Introduction

### What is MongoDB?

MongoDB is a NoSQL database storing data in JSON-like documents. NoSQL databases break from traditional relational models, ideal for managing vast data. MongoDB stands out for its scalability, flexibility, and performance trusted by giants like Google, Facebook and eBay.

### Why MongoDB?

MongoDB is a NoSQL database that provides a flexible schema, allowing developers to store data in a more natural way. It is designed to handle large volumes of data and can scale horizontally across many servers. MongoDB is particularly well-suited for applications that require high availability, real-time analytics, and rapid development cycles. It provides:

- Scalable high-performance & Open Source.
- Document Oriented database.
- Cost-Effective Solutions.
- Rich Ecosystem Of Tools, Documentation and Community

#### Features Of MongoDB ?

- JSON - like Documents (BSON)
- Indexing
- Aggregation Framework
- Security Features
- Free Atlas Database
- MongoDB Compass (GUI)

<br>

## CRUD Operations: Insert & Find

- Single Document , Insert করার জন্য `InsertOne()` এবং Multiple Document Insert করার জন্য `InsertMany()` ব্যবহার করতে হয় । Multiple Document , Insert করার জন্য Array of object আকারে Insert করতে হয় ।

```javascript
//Insert One
db.test.insertOne({ name: "Bruce Wayne" });
//Find Many
db.test.insertMany([{ name: "Bruce Wayne" }, { name: "Peter Parker" }]);
```

- শুধু মাত্র একটি Document খুজে বের করতে `FindOne()` ব্যবহার করা হয় আর সকল Document খুজে বের করতে `Find()` ব্যবহার করতে হয় ।

```javascript
//Find One
db.test.findOne({ age: 17 });
//Find Many
db.test.find({ gender: "Female" });
```

- `Find` বা `FindOne` ব্যবহার করে Documents খুজে বের করার পর ঐ Document এর শুধু নির্দিষ্ট কিছু Field , Output হিসেবে নেয়ার জন্য Field Filtering ব্যবহার করা হয় ।

```javascript
//Field Filtering => getting gender male user der only name and gender
db.test.find({ gender: "Male" }, { gender: 1, name: 1 });
```

শুধু `Find()` (অনেক Data) এর সাথে Field Filtering করার জন্য Projection ও ব্যবহার করা হয় ।

**PROJECTION** একটি গুরুত্বপূর্ন Concept ।

Document গুলো থেকে শুধু কিছু নির্দিষ্ট Field, Query করে নিয়ে আসার জন্য Projection ব্যবহার করা হয় ।

`db.users.find().projection({age: 1})`এই কমান্ড এর মাধ্যমে শুধু Age গুলো Load হবে

`db.users.find().projection({age: 0})` এই কমান্ড এর মাধ্যমে শুধু Age বাদ দিয়ে বাকি সব ফিল্ড গুলো Load হবে .

কোন কিছু রাখতে চাইলে 1 এবং বাদ দিতে চাইলে 0 দিতে হবে ।

Project শুধুমাত্র Find() এর সাথে কাজ করবে FindOne() এর সাথে কাজ করবে না । FindOne এর জন্য Filed Filtering করতে হবে

<br>

## Comparison Operators: $eq, $neq, $gt, $lt, $gte, $lte

যার নিজস্ব মান নেই কিন্তু অন্যের মান কে পরিবর্তন করতে পারে তাকে Operator বলে ।

Operator ব্যবহার করার জন্য প্রথমেই একটি { } দিয়ে নিতে হবে ।

**QUERY OPERATORS**

1. **Comparison Operators**

- $eq

`db.users.find({age: {$eq: 30}})`

যেসব ইউজার এর বয়স ৩০ এর সমান (equal) তাদের Load করার জন্য ।

`db.test.find({gender: {$eq: "Male"}})`

যেসব user এর gender is equal to “Male” তাদের Load করার জন্য

- $ne

`db.users.find({age: {$ne: 30}})`

যেসব ইউজার এর বয়স ৩০ এর সমান না (not equal) তাদের বাদ দিয়ে বাকিসব Load করার জন্য ।

- $gt

`db.users.find({age: {$gt: 30}})`

যেসব ইউজার এর বয়স ৩০ এর বেশি (greater) তাদের Load করার জন্য ।

- $gte

`db.users.find({age: {$gte: 30}})`

যেসব ইউজার এর বয়স ৩০ এর সমান অথবে বেশি (greater or equal) তাদের Load করার জন্য ।

- $lt

`db.users.find({age: {$lt: 30}})`

যেসব ইউজার এর বয়স ৩০ এর চেয়ে কম (less) তাদের Load করার জন্য ।

- $lte

`db.users.find({age: {$lte: 30}})`

যেসব ইউজার এর বয়স ৩০ এর সমান বা এর চেয়ে কম (less) তাদের Load করার জন্য ।

`db.users.find({age: {$lte: 30}}).sort({age: -1})`

এভাবে Query করলে Age field এর উপর ভিত্তি করে Descending Order এ Sort করে দিবে ।

<br>

## Inclusion/Exclusion Operators: $in, $nin

- একই Field এর উপর কমা দিয়ে একই সাথে দুটি শর্ত ব্যবহার করলে বা একাধিক শর্ত ব্যবহার করলে তাকে Implicit and বলা হয় । যেমন :

```javascript
db.test.find({ age: { $gt: 18, $lt: 30 } }, { age: 1 }).sort({ age: 1 });
```

- `$in` ব্যবহার করা হয় কোন একটি Property এর উপর ভিত্তি করে একাধিক Document Get করার জন্য । `$In` এর Array এর মধ্যে যে Value গুলো দেয়া হবে তার একটা ও যদি কোন Document এ থাকে তাহলে সেই Document টাকে Output এ দিয়ে দিবে । `in` এক সাথে শুধুমাত্র একটি Field এর value এর উপর ব্যবহার করা যায়। একাধিক Field এর জন্য ব্যবহার করতে চাইলে `$or` ব্যবহার করে প্রতি Condition এ আলাদা আলাদা `in` লিখতে হবে ।

```javascript
db.collection.find({
  $or: [
    { name: { $in: ["Anowar", "John"] } },
    { city: { $in: ["Dhaka", "Sylhet"] } },
  ],
});
```

- Multiple Field এর সাথে Condition Match করতে হলে `$or` ব্যবহার করা হয় ।

`db.users.find({name: {$in: ["Robert", "Michael"]}})`

যেসব ইউজার এর নাম Robert অথবা Michael তাদের Load করার জন্য

- $nin

`db.users.find({name: {$nin: ["Jordan", "Daniel"]}})`

যেসব ইউজার এর নাম Jordan অথবা Daniel নয় তাদের বাদ দিয়ে বাকি সব গুলো Data Load করার জন্য

- $in , $nin together

```javascript
db.test
  .find(
    {
      gender: "Female",
      age: { $nin: [18, 20, 22, 24, 26, 28, 30] },
      interests: { $in: ["Cooking", "Gaming"] },
    },
    { age: 1, gender: 1, interests: 1 }
  )
  .sort({ age: 1 });
```

<br>

## Logical Operators: $and, $or

একই Field এর মধ্যে Implicit And ব্যবহার করতে হলে একই Bracket এর মধ্যে Condition গুলো লিখতে হবে ।

`db.users.find({[{name:"anowar"}, {age: 24}]})`

যেসব ইউজার এর নাম anowar এবং বয়স ২৪ শুধু তাদের খুজে পাওয়ার জন্য এভাবে লিখতে হবে । এখানে নাম এবং বয়স দুটি শর্তই সত্য হতে হবে । $and কন্ডিশনের ক্ষেত্রে সরাসরি $and না লিখলেও সমস্যা নেই ।

- `$and` : Explicit ভাবে and ব্যবহার করে অনেকগুলো শর্ত একসাথে ব্যবহার করে Query করা হলে তাকে Explicit and বলে ।

```javascript
// explicit and with 3 conditions

db.test
  .find({
    $and: [{ gender: "Female" }, { age: { $ne: 15 } }, { age: { $lte: 30 } }],
  })
  .projection({
    age: 1,
    gender: 1,
  })
  .sort({ age: 1 });
```

- `$or`

or এর ক্ষেত্রে যেকোন একটি শর্ত সত্য হলেই হবে । একাধিক শর্তের যে কোন একটি সত্য হলে ডাটা খুঁজে পেতে `$or` ব্যবহার করা হয় ।

`db.users.find({$or: [{name:"anowar"}, {age: 24}]})`

এখানে নাম Anowar বা বয়স 24 এমন সকল user কে লোড করার জন্য or ব্যবহার করা হয় ।

```javascript
//find users with the interests of cooking or traveling
db.test
  .find({
    $or: [{ interests: "Travelling" }, { interests: "Cooking" }],
  })
  .projection({
    interests: 1,
  })
  .sort({ age: 1 });
```

users with skills name Javascript or python

```javascript
db.test
  .find({
    $or: [{ "skills.name": "JAVASCRIPT" }, { "skills.name": "PYTHON" }],
  })
  .projection({
    skills: 1,
  })
  .sort({ age: 1 });
```

একই Field এর একাধিক Value এর উপর $or ব্যবহার না করে চাইলে `$in` ব্যবহার করা যায়

```javascript
db.test
  .find({
    "skills.name": { $in: ["JAVASCRIPT", "PYTHON"] },
  })
  .projection({
    skills: 1,
  })
  .sort({ age: 1 });
```

<br>

## Element Operators: $exists, $type, $size

- কোন Document এ একটি নির্দিষ্ট Field বিদ্যমান আছে কিনা তা যাচাই করার জন্য `$exist` ব্যবহার করা হয় । এখানে age ফিল্ড exists করে এমন Data গুলো দেয়া হবে ।

```javascript
db.test.find({ age: { $exists: true } });
```

- কোন Document এর একটি নির্দিষ্ট Field এর Type চেক করার জন্য `$type` ব্যবহার করা হয় । এখানে age ফিল্ডের type - string এমন কোন Document আছে কিনা তা খুঁজার জন্য

```javascript
db.test.find({ age: { $type: "string" } });
```

- কোন Document এর মধ্যকার একটি নির্দিষ্ট সংখ্যক Element এর Array গুলো Load করার জন্য $size ব্যবহার করা হয় ।

```javascript
// user with friends array with 4 elements
db.test.find({ friends: { $size: 4 } }).project({ friends: 1 });
```

```javascript
//  users with zero friends on the friends array
db.test.find({ friends: { $size: 0 } }).project({ friends: 1 });
```

কোন Field এর ভ্যালু Null আছে এমন Document গুলো Load করার জন্য

```javascript
db.test.find({ company: { $type: "null" } }).projection({ company: 1 });
```

<br>

## Array Operators: $all, $elemMatch

Find All the Documents that has Cooking on the interests array

```javascript
db.test.find({ interests: "Cooking" }).projection({ interests: 1 });
```

- Array এর একটি নির্দিষ্ট Position এ একটি Property আছে , এমন সব Document খুঁজে বের করার জন্য Array এর Index পজিশন ব্যবহার করতে হবে । নিচে : interests নামক Array এর মধ্যে 2 number index এ Gardening আছে এমন সব Documents খুজে বের করতে হলে :

```javascript
db.test.find({ "interests.2": "Gardening" }).project({ interests: 1 });
```

- কোন Document এর একটি Array ফিল্ড এর , Array এর সবগুলো উপাদান দিয়ে যদি Query করতে হয় তাহলে , তাহলে ঐ Array এর index সহ উপাদান গুলো হুবহু match করে এমন Document থাকলে কেবল সেগুলোই return করবে ।

```javascript
db.test
  .find({ interests: ["Writing", "Gardening", "Travelling"] })
  .project({ interests: 1 });
```

আর যদি Index number , ইগনোর করে ঐ উপাদানগুলো যে কোন Order এ থাকলেই হবে , এমন Document গুলো return করতে হলে `$all` ব্যবহার করা হয় ।

```javascript
db.test
  .find({ interests: { $all: ["Writing", "Gardening", "Travelling"] } })
  .project({ interests: 1 });
```

- Object এর ক্ষেত্রে , Object এর Element গুলো match করে কিনা এমন Query করার জন্য `$elemMatch` ব্যবহার করা হয় ।

```javascript
db.test
  .find({
    skills: {
      $elemMatch: {
        name: "JAVASCRIPT",
        level: "Intermidiate",
      },
    },
  })
  .project({ skills: 1 });
```

<br>

## Update Operators: $set, $addToSet, $push

- `$set` ব্যবহার করে মূলত Primitive value গুলো update করতে হয় । Non-Primitive ( Object / Array ) ও Update করা যায় , তবে set পুর্বের সব Value Replace করে দেয় এবং শুধু নতুন Value টা বসিয়ে দেয় তাই সতর্ক থাকতে হবে ।
- `$addToSet` এর মাধ্যমে পুর্বের Value এর সাথে নতুন Value এড করে Update করা হয় । `$addToSet` এর মাধ্যমে Array তে নতুন Value এড করা যাবে কিন্তু কোন Duplicate Value এড হবে না ।

```javascript
db.test.updateOne(
  {
    // kake update korbo
    _id: ObjectId("6406ad65fc13ae5a400000c7"),
  },
  {
    // ki updata korbo
    $addToSet: {
      interests: "Debugging", // single value evabe add korte hobe - array bracket chara
    },
  }
);
```

`$addToSet` এর মাধ্যমে কোন Array এর মধ্যে একাধিক Property Update করতে হলে এর সাথে `$each` ব্যবহার করতে হবে ।

```javascript
db.test.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000066") },
  {
    $addToSet: {
      interests: {
        $each: ["Gardening", "Reading"],
      },
    },
  }
);
```

- `$Push` এর মাধ্যমে কোন নতুন Value Add করা যায় , তবে `$push` আগের Same Value থাকলেও তার Duplicate Entry করে দিবে । `$Push` এর মাধ্যমে Value Duplicate হতে পারে ।

<br>

## Remove Operators: $unset, $pop, $pull, $pullAll

- `$unset` ব্যবহার করে কোন Document এর একটি Particular Field remove করে দেয়া যায় । `$unset` ব্যবহার করার পর Field এর নামের পরে Empty string “ ” বা 1 ব্যবহার করতে হবে ।

```javascript
db.test.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000b5") },
  {
    $unset: { salary: "" },
  }
);
```

- `$pop` - ব্যবহার করে Array এর First অথবা Last Element , Remove করে দেয়া যায় । Last Element এর জন্য 1 ব্যবহার করতে হবে এবং First Element এর জন্য -1 ব্যবহার করতে হবে ।

```javascript
db.test.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000b5") },
  { $pop: { friends: -1 } }
);
```

- `$pull` - একটি Document এর মধ্যে বিদ্যমান কোন Array এর যে কোন Position এ থাকা কোন Element কে Pull করে আনতে বা Remove করতে `$pull` ব্যবহার করা হয় । একই Element একাধিক বার থাকলে , সবগুলো remove হয়ে যাবে ।

Language Array থেকে Hindi Language Remove করার জন্য

```javascript
db.test.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000066") },
  {
    $pull: { languages: "Hindi" },
  }
);
```

- `$pullAll` - একটি Array এর বিভিন্ন অনেকগুলো উপাদান একসাথে pull করে আনতে বা remove করতে `$pullAll` ব্যবহার করা হয় ।

```javascript
db.test.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000066") },
  {
    $pullAll: { skills: ["JAVASCRIPT", "KOTLIN"] },
  }
);
```

<br>

## Advanced Updates: $Set and Positional Operator

- `$set` ব্যবহার করে Object এর কোন Property এর ভ্যালু ও Change করা যায় ।

```javascript
db.test.updateOne(
  {
    _id: ObjectId("6406ad65fc13ae5a400000a8"),
  },
  {
    $set: {
      "address.city": "Dhaka",
      "address.country": "Bangladesh",
    },
  }
);
```

- Array Of Object এর Update করার জন্য `$ (Dollar sign)` বা Positional Operator ব্যবহার করতে হয় ।

```javascript
db.test.updateOne(
  {
    _id: ObjectId("6406ad65fc13ae5a400000a8"),
    "education.major": "English",
  },
  {
    $set: {
      "education.$.major": "Management",
    },
  }
);
```

---

- `$inc` ব্যবহার করে কোন Field এর মান Increment করা হয় ।

```javascript
db.test.updateOne(
  {
    _id: ObjectId("6406ad65fc13ae5a400000a8"),
  },
  {
    $inc: {
      age: 1,
    },
  }
);
```

<br>

## Delete Operations: Removing Documents and Collections

- `db.collection.deleteMany()` এর মাধ্যমে একসাথে অনেকগুলো Documents Delete করা যায় ।

```javascript
// deleting all the movies where brad pitt is cast
db.movies.deleteMany( { cast: **"Brad Pitt"** } )
```

- `db.collection.deleteOne()` ব্যবহার করে কোন সম্পুর্ন Document Delete করা যায় ।

```javascript
db.test.deleteOne({ _id: ObjectId("587589459009945") });
```

- Student `Collection` Delete করার জন্য ব্যবহার করা হয় ।

```javascript
db.students.drop({ writeConcern: { w: 1 } });
```

<br>
<div align="center">

**[⬅️ Back to Express & MongoDB Master](../README.md)**

</div>
