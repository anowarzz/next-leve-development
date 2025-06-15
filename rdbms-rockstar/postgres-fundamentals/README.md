# 📊 PostgreSQL Fundamentals - Learning Notes

<div align="center">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-Database-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Modules](https://img.shields.io/badge/Module-8-blue?style=for-the-badge)


</div>

---

## 📚 Module Overview

This module covers PostgreSQL fundamentals including table modifications, SELECT queries, data filtering, functions, and basic operations. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ ALTER Commands & Table Modifications
- ✅ SELECT Queries & Data Filtering
- ✅ WHERE Clause & Operators
- ✅ Scalar & Aggregate Functions
- ✅ Pagination & Data Operations

---

## 📝 My Learning Notes

<br/>

## Using the ALTER Keyword to Modify Tables 📄 [→ Code](./alter.sql)

`Alter` Keyword এর মাধ্যমে Database এবং Table Modify করা হয়

- Rename a table
- Modify data type of a column
- Add / drop a column
- Setting default value for a column

- Rename a column
- Add / drop constraints for column

```sql
	ALTER TABLE table_name
	action ;
```

<br/>

## Expanding on the ALTER Keyword for Table Modification

```sql
-- Adding a new column
ALTER TABLE person2
ADD COLUMN email VARCHAR(25) NOT NULL;
```

```sql
-- Adding a new column with defult value
ALTER TABLE person2
ADD COLUMN email VARCHAR(25) DEFAULT 'default@gmail.com' NOT NULL;
```

```sql
-- Inserting a row to the table
INSERT INTO person2
VALUES(10, 'pheobe', 22, 'mail@gmail.com')
```

```sql
-- Dropping or removing a column
ALTER TABLE person2
DROP COLUMN email;
```

```sql
-- Renaming a column
ALTER TABLE person2
RENAME COLUMN user_name to "name";
;
```

```sql
-- Changing column data type
ALTER TABLE person2
ALTER COLUMN user_name TYPE VARCHAR(50);
```

```sql
-- adding constraints to a column
ALTER TABLE person2
ALTER COLUMN user_age set NOT NULL;
```

```sql
-- removing a constraints from a column
ALTER TABLE person2
ALTER COLUMN user_age drop NOT NULL;
```

<br/>

## Different Methods to Alter Tables For Primary Key, Unique etc

Primary Key, Unique, Foreign Key এগুলা Alter ব্যবহার করে করা যায়না কারন, এইগুলো Multiple Field নিয়ে কাজ করে ।

```sql
-- Adding unique constraints
ALTER TABLE person2
ADD constraint unique_person2_name UNIQUE(user_name);
```

constraints দেয়ার ক্ষেত্রে প্রথমে দিতে হবে কোন constraints add করা হবে তার নাম এর পর Table এর নাম এরপর Column এর নাম যেমন `unique_person2_name`

```sql
-- Removing unique constraints
ALTER TABLE person2
DROP constraint unique_person2_name;
```

```sql
-- Adding Primary key
ALTER TABLE person2
ADD constraint pk_person2_age PRIMARY KEY(user_age);
```

- Table `Drop` করা হলে তার Structure সহ সবকিছু একদম Delete হয়ে যায় ।
- তাই Drop এর বদলে `TRUNCATE` ব্যবহার করলে Table এর structure টা থেকে যায় কিন্তু Table এর সব গুলো Data মুছে যায় ।

`TRUNCATE TABLE friends;`

#### SELECT Keyword

The SELECT statement is used to retrieve data from one or more tables and can be customized with `conditions, sorting,` and other clauses

SELECT মুলত Data Query করার জন্য ব্যবহার করা হয় ।

<br/>

## Mastering SELECT Queries: Column Aliasing and Result Ordering 📄 [→ Code](./select.sql)

Primary Key যদি SERIAL হয় এবং Data insert করার সময় না দেয়া থাকে তাহলে তা Default ভাবে পাবে এবং Increment হবে ।

- SELECT `* star` দিলে Table এর সবগুলো Column এর সকল Data দেখাবে ।
- `SELECT email from students ;` এর মাধ্যমে শুধু email field কে দেখাবে ।

- `SELECT email, age, country from students ;` Multiple Column Select করার জন্য ।
- একটি Column Select করে তার নাম Data show করার সময় Type Alias এর মাধ্যমে change করা `SELECT email as user_email from students ;`
- `SELECT * from students ORDER BY age DESC;`

<br/>

## Data Filtering: WHERE Clause, Logical Operators, and Comparison Operators

- `SELECT country from students ORDER BY country ASC;` সবগুলো Student এর Country দেখার জন্য
- Student রা কত দেশ থেকে আসছে বা unique country কয়টি তা জানার জন্য `SELECT DISTINCT country from students;`

WHERE CLAUSE

```sql
-- Select Student from USA Only
SELECT * from students
WHERE country = 'USA';
```

```sql
-- Select student with a grade in law || multiple condition
SELECT * from students
WHERE grade = 'A' and course = 'Law'
```

```sql
-- select student from usa or australia
SELECT * from students
WHERE country = 'USA' or country = 'Australia' ;
```

Javascript এর মতই Math এর Operator গুলো ব্যবহার করা যায়

```
SELECT * from students
WHERE age != 20  ;

<> এটা Not equal to sign
```

<br/>

## Exploring Scalar and Aggregate Functions in PostgreSQL 📄 [→ Code](./groupBy.sql)

কোন Table এর সবগুলো Row এর উপর কোন Operation চালিয়ে যদি প্রতিটা Row এর Data কে পরিবর্তন করা হয় । তাহলে তাকে Scaler Function বলে ।

- **Scaler functions operate on a single value and return a single value. They perform an operation on each rows, data independently .**
- Scaler functions give multiple data as result

আর যদি সবগুলো Row এর উপর কোন Operation চালিয়ে শুধু মাত্র একটি Single Value পাওয়া যায় তাহলে তাকে Aggregate Function বলে ।

- **Aggregate functions operate on a set of values and return a single value summarizing the set. They perform an operation across multiple rows, often used with the GROUP BY clause.**
- Returns only one value

### 🔤 **String Scalar Functions**

```sql
SELECT LOWER(first_name) FROM students LIMIT 1;
-- Result: 'alice'

SELECT UPPER(country) FROM students LIMIT 1;
-- Result: 'USA'

SELECT LENGTH(course) FROM students WHERE first_name = 'Alice';
-- Result: 11

SELECT TRIM('  Web Dev  ');
-- Result: 'Web Dev'

SELECT CONCAT(first_name, ' ', last_name) FROM students WHERE first_name = 'Ethan';
-- Result: 'Ethan Hunt'

```

---

### 🔢 **Numeric Scalar Functions**

```sql
SELECT ROUND(3.456, 1);
-- Result: 3.5

SELECT CEIL(22.3);
-- Result: 23

SELECT FLOOR(22.9);
-- Result: 22

SELECT MOD(age, 2) FROM students WHERE first_name = 'Bob';
-- Result: 1

```

---

### 📅 **Date Scalar Functions**

```sql
SELECT CURRENT_DATE;
-- Result: 2025-05-19

SELECT EXTRACT(YEAR FROM dob) FROM students WHERE first_name = 'Diana';
-- Result: 2001

SELECT AGE(dob) FROM students WHERE first_name = 'Oscar';
-- Result: 24 years 10 mons ...

```

### 🧠 **Logic & Null Scalar Functions**

```sql

SELECT COALESCE(NULL, 'fallback@example.com');
-- Result: 'fallback@example.com'

SELECT NULLIF(grade, 'B') FROM students WHERE first_name = 'Bob';
-- Result: NULL

SELECT CASE WHEN age < 21 THEN 'Minor' ELSE 'Adult' END FROM students WHERE first_name = 'Kevin';
-- Result: 'Minor'

```

---

### 🧮 **Aggregate Functions**

```sql

SELECT COUNT(*) FROM students;
-- Result: 20  // total row

SELECT AVG(age) FROM students;
-- Result: 21.55

SELECT MIN(dob) FROM students;
-- Result: 2000-07-07

SELECT MAX(age) FROM students;
-- Result: 24

SELECT SUM(age) FROM students;
-- Result: 431

SELECT COUNT(DISTINCT country) FROM students;
-- Result: 11  // unique country

```

Scaler and aggregate function এর Combination এও কাজ করা যায় ।

```sql
--  max length of first name
SELECT max(length(first_name)) from students ;
```

<br/>

## Logical Negation NOT, Understanding NULL and the Null-Coalescing Operator

কোন Logic এর আগে Not বসিয়ে সেই Logic এর উল্টো Result achieve করা যায় ।

```sql

SELECT * from students
 WHERE NOT country = 'USA'

```

- Null is a special value in postgres
- Null Value এর সাথে যত ধরনের Operation করা হোক না কেন তার Result হবে Null
- Null এর জন্য is operator ব্যবহার করতে হবে ।

- **Check if a value is NULL**
  ```sql
  SELECT email IS NULL FROM students WHERE first_name = 'Alice';
  -- Result: false
  ```
- **Check if a value is NOT NULL**
  ```sql
  SELECT dob IS NOT NULL FROM students WHERE first_name = 'Alice';
  -- Result: true
  ```
- **Replace NULL with default using `COALESCE()`**
  ```sql
  SELECT COALESCE(email, 'no_email@example.com') FROM students WHERE first_name = 'Alice';
  -- Result: 'alice.johnson@example.com'
  ```
- **Ignore value if it equals something using `NULLIF()`**
  `sql
  SELECT NULLIF(grade, 'B') FROM students WHERE first_name = 'Bob';
  -- Result: NULL

  ```

  ```

<br/>

## Exploring IN, BETWEEN, LIKE, and ILIKE Operators

#### 🔘 `IN` — Match multiple values

একাধিক Value এর Condition `or` দিয়ে যুক্ত করার বদলে IN ব্যবহার করা যায় ।

```sql
SELECT first_name, grade FROM students WHERE grade IN ('A', 'B');
-- Returns all students with grade A or B
```

```sql
SELECT first_name, country FROM students WHERE country IN ('India', 'USA');
-- Returns students from India or USA
```

---

#### 📏 `BETWEEN` — Match range (inclusive)

```sql
SELECT first_name, age FROM students WHERE age BETWEEN 21 AND 23;
-- Returns students aged 21, 22, or 23
```

```sql
SELECT first_name, dob FROM students WHERE dob BETWEEN '2002-01-01' AND '2003-12-31';
-- Returns students born in 2002 or 2003
```

---

#### 🔍 `LIKE` — Case-sensitive pattern match (`%` = wildcard)

```sql
SELECT first_name, email FROM students WHERE email LIKE '%.com';
-- Returns students with emails ending in '.com'
```

```sql
SELECT first_name FROM students WHERE first_name LIKE 'A%';
-- Returns names starting with 'A' (e.g. Alice)
```

---

#### 🔍 `ILIKE` — Case-insensitive pattern match

```sql
SELECT first_name FROM students WHERE first_name ILIKE 'a%';
-- Returns names starting with 'a' or 'A' (case-insensitive)

```

In SQL, `%` and `_` are wildcard characters used with the `LIKE` operator:

- `%` matches **zero or more characters** (e.g., `'%cat%'` matches `cat`, `bobcat`, `category`).
- `_` matches **exactly one character** (e.g., `'c_t'` matches `cat`, `cut`, but not `cart`).

<br/>

## Pagination with Limit Offset and Data Deletion

Postgres এ Pagination করার জন্য LIMIT এবং OFFSET ব্যবহার করা হয় ।

LIMIT এর মাধ্যমে বুঝায় কয়টি Data দেখাবে এবং OFFSET এর মাধ্যমে বুঝায় প্রথম থেকে কয়টি Data Skip করবে

```sql
SELECT * from students
  WHERE country IN ('USA', 'UK', 'India') LIMIT 5 OFFSET 2 ;

```

Pagination এর জন্য OFFSET \* Page Number দিয়ে গুন করতে হবে ।

```sql
-- Pagination
SELECT * from students LIMIT 5 OFFSET 5 * 2 ;
```

`DELEtE` এবং `DROP` হলো Dangerous Command তাই সতর্কতার সাথে ব্যবহার করতে হবে ।

```sql
DELETE from students
  WHERE grade = 'C' AND country = 'USA';
```

সব ধরনের Condition ব্যবহার করে Data Select করে Delete করা যাবে ।

<br/>

## Understanding and Using the UPDATE Operator

Condition এর মধ্যমে Row এবং Column Select করে Data Update করতে হবে সতর্কতার সাথে

```sql
-- UPDATE COLUMN
UPDATE students
  set email = 'default@gmail.com', age = 33
  WHERE student_id = 47;
```

<br>

## 💻 Comprehensive Examples 📄 [→ Code](./manage_student.sql)

The `manage_student.sql` file contains a complete student management system with:

- **Table Creation** - Student table with all data types
- **Data Insertion** - 20+ student records
- **ALTER Operations** - Adding columns, constraints, modifications
- **SELECT Queries** - Filtering, sorting, pagination
- **UPDATE & DELETE** - Data modifications and removal

This file demonstrates practical implementation of all concepts covered in this module.

---
