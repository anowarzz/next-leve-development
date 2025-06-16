# 🍃 MongoDB Aggregation & Indexing - Learning Notes

<div align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Aggregation](https://img.shields.io/badge/Aggregation-Pipeline-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Modules](https://img.shields.io/badge/Module-16-red?style=for-the-badge)

_Advanced MongoDB Operations & Performance_

</div>

---

## 📚 Module Overview

This module covers advanced MongoDB concepts including aggregation pipelines, complex queries, and indexing strategies for performance optimization. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Aggregation Pipeline Stages
- ✅ Data Transformation & Grouping
- ✅ Advanced Query Operations
- ✅ Database Indexing & Performance
- ✅ Compound & Text Indexing

---

<br>

## What Is Aggregation ??

Aggregation is a way of processing a large number of documents in a collection by means of passing them through **different stages** \*\*\*\*

The stage make up what is known as pipeline.

The stage in pipeline can filter, sort, group, reshape and modify documents that pass through the pipeline.

Aggregation Syntax →

```jsx
db.collection.aggregate([
  {
    // Stage 1
    $match: {
      /* query criteria */
    },
  },
  {
    // Stage 2
    $group: {
      /* grouping criteria */
    },
  },
  {
    // Stage 3
    $sort: {
      /* sorting criteria */
    },
  },
  // ... more stages as needed
]);
```

Each stage in the pipeline transforms the documents as they pass through. Documents flow through the stages in sequence, with the output of one stage becoming the input for the next stage.

<br>

## $match & $project Aggregation Stage

- `$match` Stage এর মাধ্যমে আমরা একটি Collection এর শুধুমাত্র সেই সকল Documents নিয়ে কাজ করতে পারি যারা একটি নির্দিষ্ট Requirements পূরন করে । যারা করে না তাদের কে Filter করে বাদ দিয়ে দেয়া হয় ।

```jsx
db.test.aggregate([
  // stage - 1
  {
    $match: {
      gender: "Male",
      age: { $gte: 30 },
    },
  },
]);
```

- `$project` Stage এ একটি Document এর যেসব Field কে Output হিসেবে লাগবে শুধু সেগুলো 1 দিয়ে দেয়া হয় বা সিলেক্ট করা হয় ।

```jsx
db.test.aggregate([
  // stage - 1
  { $match: { gender: "Male", age: { $gte: 30 } } },
  // stage -2
  { $project: { name: 1, age: 1, gender: 1 } },
]);
```

- **$match:** It is used for filtering the documents can reduce the amount of documents that are given as input to the next stage.
- **$project:** It is used to select some specific fields from a collection.

$project সব Stage এর শেষে ব্যবহার করতে হবে ।

**Default rule:** `$match` → `$group` → `$sort` → **`$project`**

<br>

## $addFields, $out & $merge Aggregation Stage

Query করার সময় সময়ে যত বেশি Stage ব্যবহার করা হবে Query Time তুলনামুলক তত বেশি হবে । তাই চেষ্টা করতে হবে যত কম Stage ব্যবহার করে Result নিয়ে আসা যায় ।

- `$addFields` এর মাধ্যমে কোন Document এর Existing Field এর সাথে নতুন এক বা একাধিক Field Add করে সেইসব Document এর উপর কোন Operation করা যায় বা ইচ্ছা করলে সেগুলো নিয়ে নতুন একটি Collection তৈরী করা যায় । `$addFields` Original Document কে Modify করে না । শুধুমাত্র Pipeline Stage এ নতুন Field Add করতে Help করে

```jsx
db.test.aggregate([
  // stage - 1
  { $match: { gender: "Male" } },
  // stage -2
  { $addFields: { course: "Level-2", eduTech: "Programing Hero" } },
]);
```

- `$out` ব্যবহার করে $addFields এর মাধ্যমে নতুন এড করা Field সহ নিয়ে সবগুলো Documents কপি করে একটি নতুন Collection তৈরি করা যায় ।

```jsx
db.test.aggregate([
  // stage - 1
  { $match: { gender: "Male" } },
  // stage -2
  { $addFields: { course: "Level-2", eduTech: "Programing Hero" } },
  // stage -3
  { $out: "course-student" },
]);
```

- `$merge` - নতুন Collection তৈরি না করে `addFields` এর মাধ্যমে এড করা ফিল্ড গুলো বর্তমান Existing কোন Collection এ `$merge` করে দেয়ার জন্য $merge ব্যবহার করা হয় ।

```jsx
db.test.aggregate([
  //stage -1
  //  { $match: {gender: "Male"}  },
  //stage -2
  {
    $addFields: {
      course: "Level-2",
      eduTech: "Programming Hero",
    },
  },
  // stage -3
  //    {$project: {course: 1, gender: 1, eduTech: 1}},

  // stage - 4
  { $merge: "test" },
]);
```

<br>

## $group, $sum & $push Aggregation Stage

- `$group` - কোন নির্দিষ্ট Field কে বা এর কোন Property value কে একটি key হিসাবে ধরে ঐ key বা Property value বিদ্যমান আছে এমন সব Document কে নিয়ে একটি Group করার জন্য `$group` ব্যবহার করা হয় ।

`$Group` এর মধ্যে `_id` ব্যবহার করে একটি Field কে নির্দিষ্ট করে দিতে হয় যার উপর ভিত্তি করে Group করা হবে ।

```jsx
db.test.aggregate([
  { $group: { _id: "$address.country", count: { $sum: 1 } } },
]);
```

- কোন group এর under এ কতটি Document আছে তা জানার জন্য `$sum` ব্যবহার করা হয় ।

- `$push` ব্যবহার করে Output হিসেবে একটি Array পাওয়া যায় । সেখানে কোন কোন Property available হবে তা উল্লেখ করে দিতে হবে ।

```jsx
db.test.aggregate([
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      showNameArray: { $push: "$name" },
    },
  },
]);
```

- `$$ROOT` - push এর মধ্যে $ROOT ব্যবহার করলে group করা সবগুলো full Document একটি Array এর মধ্যে push হয়ে যাবে ।

```jsx
db.test.aggregate([
  {
    $group: {
      _id: "$address.country",
      count: { $sum: 1 },
      fullDoc: { $push: "$$ROOT" },
    },
  },
  {
    $project: {
      "fullDoc.name": 1,
      "fullDoc.email": 1,
      "fullDoc.phone": 1,
    },
  },
]);
```

<br>

## Explore More About $group & $project

- Group করার সময় `_id = null` দিলে সবগুলো Document একটি Group এর Under এ চলে আসবে । মূলত কোন Collection এর সবগুলো Document কে সিলেক্ট করে সবগুলোর উপর কোন Operation চালানোর জন্য `_id=null` ব্যবহার করা হয় ।
- `$min` - group করা সব Document এর কোন একটি Field এর সবচেয়ে minimum value খুঁজে বের করার জন্য ব্যবহার করা হয় ।
- `$max` - group করা সব Document এর কোন একটি Field এর সবচেয়ে maximum value খুঁজে বের করার জন্য ব্যবহার করা হয় ।
- `$avg` - group করা সব Document এর কোন একটি Field এর সবচেয়ে সবগুলো Value এর Average খুঁজে বের করার জন্য ব্যবহার করা হয় ।

- `$PROJECT` Stage এ আমরা চাইলে কোন Filed এর নাম পরিবর্তন করতে পারি পুরাতন নামের reference রেখে । এবং PROJECT STAGE এ আমরা চাইলে Calculation ও করতে পারি ।

```jsx
db.test.aggregate([
  // stage - 1
  {
    $group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
      minSalary: { $min: "$salary" },
      maxSalary: { $max: "$salary" },
      avgSalary: { $avg: "$salary" },
    },
  },
  // stage - 2
  {
    $project: {
      totalSalary: 1,
      minimumSalary: "$maxSalary",
      maximumSalary: "$maxSalary",
      averageSalary: "$avgSalary",
      salaryRangeBewtwenMaxAndMin: { $subtract: ["$maxSalary", "$minSalary"] },
    },
  },
]);
```

<br>

## Explore $group with $unwind Aggregation Stage

`$unwind` —→ Aggregation এ Array নিয়ে কাজ করার সময় $unwind ব্যবহার করে Array কে ব্রেক করে নিতে হয় । যার ফলে Array এর প্রতিটি উপাদান নিয়ে একটি হুবহু নতুন Document তৈরী হয় তবে `_id` একই থাকে ।

```jsx
db.test.aggregate([
  // stage - 1
  { $unwind: "$friends" },

  // stage -2
  { $group: { _id: "$friends", count: { $sum: 1 } } },
]);
```

বয়স অনুসারে মানুষের Interests গুলো জানার জন্য 👇

```jsx
db.test.aggregate([
  // stage -1
  { $unwind: "$interests" },
  {
    $group: { _id: "$age", interestPerAge: { $push: "$interests" } },
  },
]);
```

<br>

## $bucket, $sort, and $limit Aggregation Stage

- `$bucket` - ব্যবহার করে একটি Collection এর Document গুলো কে বিভিন্ন Range এ ভাগ করা যায় । যেমন যদি এমন একটি লিষ্ট তৈরী করতে হয় যেখানে , 0 - 20 Roll এর Student রা একটি লিষ্ট এ থাকবে 20-40 Roll এর Student রা একটি লিষ্ট এ থাকবে এবং Remaining Student রা আরেকটি আলাদা লিষ্ট এ থাকবে তাহলে তাহলে এক্ষেত্রে Bucket ব্যবহার করতে হবে ।

- `$sort` ব্যবহার করে কোন Field এর উপর ভিত্তি করে sort করতে হবে সেটা বলে দিতে হয় । sort field এর ভ্যালু 1 দিলে হবে ascending order . আর -1 দিলে হবে Descending order.
- `$limit` ব্যবহার করে কতগুলো Document Output হিসেবে আসবে তা limit কর দেয়া যায় ।

সবসময় sort এর পর লিমিট use করতে হবে ।

```jsx
db.test.aggregate([
  // stage -1
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 40, 60, 80],
      default: "Older than 80",
      output: {
        count: { $sum: 1 },
        listOfOlderPeople: { $push: "$$ROOT" },
      },
    },
  },
  // stage -2
  {
    $sort: { count: -1 },
  },
  // stage - 3
  {
    $limit: 2,
  },
  // stage -4
  { $project: { count: 1 } },
]);
```

<br>

## $facet, Multiple Pipeline Aggregation Stage

`$facet` - ব্যবহার করে Aggregation এর মধ্যে একাধিক Pipeline তৈরী করা যায় এবং Advance Query করা যায় ।

একই Data এর উপর Query করে Multiple Report Generate করতে হলে `$facet` ব্যবহার করতে হয় ।

```jsx
db.test.aggregate([
  {
    $facet: {
      // pipeline -1
      friendsCount: [
        // stage -1
        { $unwind: "$friends" },
        // stage -2
        { $sortByCount: "$friends" },
      ],
      // pipeline - 2
      educationCount: [
        // stage -1
        { $unwind: "$education" },
        // stage -2
        { $group: { _id: "$education.degree", count: { $sum: 1 } } },
      ],
      // pipeline -3
      skillsCount: [
        // stage -1
        { $unwind: "$skills" },
        // stage -2
        { $group: { _id: "$skills.name", count: { $sum: 1 } } },
      ],
    },
  },
]);
```

<br>

## $lookup Stage, Embedding vs Referencing

**EMBEDDED =⇒ When to Use Embedded**

- One-to-One Relationships
- Frequent Reading Data
- Atomic Updates
- Reduced Network Overhead
- Small Data Size

**REFERENCING =⇒ When to use Referencing**

- One-to-Many Relationships
- Many-to-Many
- Frequent Writing
- Big Data Size
- Scalability
- Flexibility

- `$lookup` ব্যবহার করার মাধ্যমে Database এর দুটি Collection এর মধ্যে linkup করা যায় । যেমন Order Collection থেকে Lookup ব্যবহার করে test collection এর User এর Join করে একটি নতুন Document পাওয়া যাবে যেখানে, user এবং তার Order গুলো এক সাথে পাওয়া যাবে ।

```jsx
db.orders.aggregate([
  {
    $lookup: {
      from: "test",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
]);
```

<br>

## What is Indexing, COLLSCAN vs IXSCAN

- COLLSCAN হলো একটি একটি Document করে পুরো Collection Scan করা । CollScan এ সাধারনত বেশি সময় লাগে ।
- IXSCAN হলো Index scan । এতে সময় কম লাগে ।
- MongoDB আমাদের যে \_ID , provide করে , সেই ID একটি Index অনুসারে রাখা থাকে, তাই ID দিয়ে Query করলে কম সময়ে আউটপুট পাওয়া যায় ।
- আমাদের প্রয়োজনে কিছু কিছু Field দিয়ে Index তৈরী করে রাখতে পারি, যেসব Field নিয়ে বেশি Query করার প্রয়োজন হয় । দরকারী Field ছাড়া Index ব্যবহার করা উচিত না । কারন Index এর জন্য Database এ আলাদা একটি Memory খরচ হয় ।

Index তৈরী করার জন্য

`db.test.createIndex({email: 1}`)

একটি Query এর সকল Details জানার জন্য এবং Execution Details জানার জন্য

```jsx
db.test
  .find({ _id: ObjectId("6406ad63fc13ae5a40000066") })
  .explain("executionStats");
```

index drop করার জন্য dropIndex ব্যবহার করা হয় ।

```jsx
db.test.dropIndex({ email: 1 });
```

<br>

## Explore Compound Index and Text Index

- একাধিক Field একসাথে নিয়ে একটি Index তৈরি করা হলে তাকে Compound Index বলা হয় ।
- সকল Document এর কোন একটি নির্দিষ্ট Field এ কোন নির্দিষ্ট Text আছে কিনা, এমন Text based query এর জন্য Text index তৈরী করা হয় । text index এর মধ্যে Search index ব্যবহার করা হয় ।

About Field এর উপর Text Index তৈরী করার জন্য

`db.test.createIndex({about: "text"})`

About Field এর উপর Search Query করার জন্য

```jsx
// Search for documents where the 'about' field contains the word 'coding'
db.test.find({ $text: { $search: "coding" } });
```
