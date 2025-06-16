# 🎯 MongoDB Query Practice

This file contains practical MongoDB query exercises for hands-on learning and practice.

---

## 📝 Query Exercises

### 1. Find Documents with Age Filter

**Task:** Find all documents where the age is greater than 30, and only return the name and email fields.

```javascript
db.test.find({ age: { $gt: 30 } }, { name: 1, email: 1 });
```

<br>

### 2. Filter by Multiple Values

**Task:** Find documents where the favorite color is either "Maroon" or "Blue."

```javascript
db.test.find({
  favouriteColor: { $in: ["Maroon", "Blue"] },
});
```

<br>

### 3. Find Empty Arrays

**Task:** Find all documents where the skill is an empty array.

```javascript
db.test.find({
  skills: { $size: 0 },
});
```

<br>

### 4. Find Documents with Multiple Skills

**Task:** Find documents where the person has skills in both "JavaScript" and "Java."

```javascript
db.test.find(
  {
    "skills.name": { $all: ["JAVASCRIPT", "JAVA"] },
  },
  { skills: 1 }
);
```

<br>

### 5. Add New Skill to Array

**Task:** Add a new skill to the skills array for the document with the email "amccurry3@cnet.com". The skill is {"name": "PYTHON", "level": "Beginner", "isLearning": true}

```javascript
db.test.updateOne(
  { email: "amccurry3@cnet.com" },
  {
    $addToSet: {
      skills: { name: "PYTHON", level: "Beginner", isLearning: true },
    },
  }
);
```

<br>

### 6. Add Language to Array

**Task:** Add a new language "Spanish" to the list of languages spoken by the person.

```javascript
db.test.updateOne(
  { email: "amccurry3@cnet.com" },
  {
    $addToSet: {
      languages: "Spanish",
    },
  }
);
```

<br>

### 7. Remove Skill from Array

**Task:** Remove the skill with the name "Kotlin" from the skills array.

```javascript
db.test.updateOne(
  { email: "amccurry3@cnet.com" },
  {
    $pull: {
      skills: { name: "Kotlin" },
    },
  }
);
```

---
