# 🚀 MongoDB Aggregation Pipeline - Practice Queries

<div align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Practice](https://img.shields.io/badge/Practice-Queries-blue?style=for-the-badge)

_Practice problems for mastering MongoDB aggregation pipelines_

</div>

---

## 📋 Table of Contents

- [Basic Aggregation Operations](#basic-aggregation-operations)
- [Advanced Grouping & Matching](#advanced-grouping--matching)
- [Array Operations with $unwind](#array-operations-with-unwind)
- [Complex Pipeline Operations](#complex-pipeline-operations)
- [Multi-stage Data Processing](#multi-stage-data-processing)

---

## 🔰 Basic Aggregation Operations

### Problem 1: Count Active Users by Gender

**Task:** Retrieve the count of individuals who are active (isActive: true) for each gender.

```javascript
db.getCollection("massive-data").aggregate([
  // Stage 1: Filter active users
  {
    $match: { isActive: true },
  },
  // Stage 2: Group by gender and count
  {
    $group: { _id: "$gender", count: { $sum: 1 } },
  },
]);
```

**Concepts Used:** `$match`, `$group`, `$sum`

---

## 🎯 Advanced Grouping & Matching

### Problem 2: Filter Active Users with Specific Preferences

**Task:** Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana".

```javascript
db.getCollection("massive-data").aggregate([
  // Stage 1: Filter active users with banana preference
  {
    $match: { isActive: true, favoriteFruit: "banana" },
  },
  // Stage 2: Project only required fields
  {
    $project: { name: 1, email: 1 },
  },
]);
```

**Concepts Used:** `$match`, `$project`, Multiple conditions

### Problem 3: Calculate Average Age by Favorite Fruit

**Task:** Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.

```javascript
db.getCollection("massive-data").aggregate([
  // Stage 1: Group by favorite fruit and calculate statistics
  {
    $group: {
      _id: "$favoriteFruit",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
    },
  },
  // Stage 2: Sort by average age (descending)
  {
    $sort: { avgAge: -1 },
  },
]);
```

**Concepts Used:** `$group`, `$avg`, `$sort`

---

## 🔄 Array Operations with $unwind

### Problem 4: Extract Unique Friend Names with Pattern Matching

**Task:** Retrieve a list of unique friend names for individuals who have at least one friend, and include only the friends with names starting with the letter "W".

**Hints:** Explore how to use regex [ "friends.name": /^W/]

```javascript
db.getCollection("massive-data").aggregate([
  // Stage 1: Unwind the friends array
  { $unwind: "$friends" },
  // Stage 2: Filter friends whose names start with 'W'
  { $match: { "friends.name": /^W/ } },
  // Stage 3: Group by user ID and get unique friend names
  {
    $group: { _id: "$_id", uniqueFriends: { $addToSet: "$friends.name" } },
  },
]);
```

**Concepts Used:** `$unwind`, `$match`, `$addToSet`, Regex patterns

---

## 🚀 Complex Pipeline Operations

### Problem 5: Multi-Faceted Age Analysis with Bucketing

**Task:** Use $facet to separate individuals into two facets based on their age: those below 30 and those above 30. Then, within each facet, bucket the individuals into age ranges (e.g., 20-25, 26-30, etc.) and sort them by age within each bucket.

```javascript
db.getCollection("massive-data").aggregate([
  {
    $facet: {
      // Facet 1: Users below 30
      below30: [
        { $match: { age: { $lt: 30 } } },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [20, 25, 30],
            default: "Other",
            output: {
              names: { $push: "$name" },
            },
          },
        },
        {
          $sort: { age: 1 },
        },
      ],
      // Facet 2: Users above or equal to 30
      above30: [
        { $match: { age: { $gte: 30 } } },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [30, 35, 40],
            default: "Other",
            output: {
              names: { $push: "$name" },
            },
          },
        },
      ],
    },
  },
  {
    $sort: { age: 1 },
  },
]);
```

**Concepts Used:** `$facet`, `$bucket`, `$match`, `$sort`, Multi-pipeline processing

---

## 💰 Multi-stage Data Processing

### Problem 6: Company Financial Analysis

**Task:** Calculate the total balance of individuals for each company and display the company name along with the total balance. Limit the result to show only the top two companies with the highest total balance.

```javascript
db.getCollection("massive-data").aggregate([
  // Stage 1: Group by company and calculate total balance
  {
    $group: {
      _id: "$company",
      totalBalance: { $sum: { $toDouble: { $substr: ["$balance", 1, -1] } } },
    },
  },
  // Stage 2: Sort by total balance (descending)
  {
    $sort: { totalBalance: -1 },
  },
  // Stage 3: Limit to top 2 companies
  {
    $limit: 2,
  },
]);
```

**Concepts Used:** `$group`, `$sum`, `$toDouble`, `$substr`, `$sort`, `$limit`, String manipulation

---
