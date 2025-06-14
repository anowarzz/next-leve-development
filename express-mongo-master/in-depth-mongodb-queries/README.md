### What is MongoDB ?

MongoDB is a NoSQL database storing data in JSON-like documents. NoSQL databases break from traditional relational models, ideal for managing vase data. MongoDB stands out for its scalability , flexibility , and performance trusted by giants like Google, Facebook and eBay.

#### Why MongoDB ?

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

## insert,insertOne, find, findOne, field filtering, project\*\*

- Single Document , Insert করার জন্য `InsertOne()` এবং Multiple Document Insert করার জন্য `InsertMany()` ব্যবহার করতে হয় । Multiple Document , Insert করার জন্য Array of object আকারে Insert করতে হয় ।

```jsx
//Insert One
db.test.insertOne({ name: "Bruce Wayne" });
//Find Many
db.test.insertMany([{ name: "Bruce Wayne" }, { name: "Peter Parker" }]);
```

- শুধু মাত্র একটি Document খুজে বের করতে `FindOne()` ব্যবহার করা হয় আর সকল Document খুজে বের করতে `Find()` ব্যবহার করতে হয় ।

```jsx
//Find One
db.test.findOne({ age: 17 });
//Find Many
db.test.find({ gender: "Female" });
```

- `Find` বা `FindOne` ব্যবহার করে Documents খুজে বের করার পর ঐ Document এর শুধু নির্দিষ্ট কিছু Field , Output হিসেবে নেয়ার জন্য Field Filtering ব্যবহার করা হয় ।

```jsx
//Field Filtering => getting gender male user der only name and gender
db.test.find({ gender: "Male" }, { gender: 1, name: 1 });
```

শুধু `Find()` (অনেক Data) এর সাথে Field Filtering করার জন্য Projection ও ব্যবহার করা হয় ।

**PROJECTION** একটি গুরুত্বপূর্ন Concept ।

Document গুলো থেকে শুধু কিছু নির্দিষ্ট Field, Query করে নিয়ে আসার জন্য Projection ব্যবহার করা হয় ।

`db.users.find().projection({age: 1})`এই কমান্ড এর মাধ্যমে শুধু Age গুলো Load হবে

`db.users.find().projection({age: ০})` এই কমান্ড এর মাধ্যমে শুধু Age বাদ দিয়ে বাকি সব ফিল্ড গুলো Load হবে .

কোন কিছু রাখতে চাইলে 1 এবং বাদ দিতে চাইলে 0 দিতে হবে ।
