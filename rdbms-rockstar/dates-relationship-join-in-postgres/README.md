# 🚀 Dates & Relationships in PostgreSQL - Learning Notes

<div align="center">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-10-red?style=for-the-badge)

</div>

---

## 📚 Module Overview

This module covers essential PostgreSQL concepts related to handling dates, building relationships between tables, and performing various types of joins to retrieve related data. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Date functions and manipulations in PostgreSQL
- ✅ Foreign key constraints and relationships
- ✅ Inner, Left, Right, Full, Cross, and Natural Joins
- ✅ GROUP BY and HAVING clauses
- ✅ Practical database scenarios with employees and orders

---

<br>

## Handling Date and Date Functions in PostgreSQL 📄 [→ Code](./date.sql)

Date নিয়ে কাজ করার ব্যপারটা Tricky হয়ে থাকে ।

postgres এ time related অনেকগুলো functions আছে ।

- time zone নিয়ে কাজ করার দরকার হলে timestamp with time zone select করতে হবে

```sql
SHOW timezone;

CREATE TABLE timezone (
    ts TIMESTAMP without time zone,
    tsz TIMESTAMP with time zone
);

INSERT INTO
    timezone
VALUES (
        '2025-5-20 06:40:00',
        '2025-5-20 06:40:00'
    );

SELECT * from timeZone

-- date and time casting
SELECT now()::date;

SELECT now()::time;

-- showing current date
SELECT CURRENT_DATE

-- getting todays date in desired format
SELECT to_char(now(), 'yyyy/mm/dd')

SELECT to_char(now(), 'Month')

-- Interval /
SELECT CURRENT_DATE - INTERVAL '1 Year 3 month'

-- age calculation / time difference between dates
SELECT age (CURRENT_DATE, '1999-03-04')

-- showing age from birthdate
SELECT *, age(CURRENT_DATE, dob) from students

-- extract function to extract year, month and day from a date
SELECT extract(year from '2025-5-20' :: date)
```

<br/>

## Grouping and Filtering Data with GROUP BY and HAVING 📄 [→ Code](./student-management.sql)

Group By =⇒ A Feature to display data in groups

Aggregate Function GROUP BY এর সাথে বেশি ব্যবহার করা হয় ।

Group By এর মধ্যে Aggregate Function ব্যবহার করলে ঐ Aggregate function টি Entire Data Set এর মধ্যে Run হয় না ।

শুধু মাত্র ঐ Group এর মধ্যে Run হয় ।

- Group By এর Process টি হলো

Split , Apply, Combine

- WHERE operation run হয় প্রতিটা Row এর জন্য
- Group By, Having এগুলো Run হয় Group এর জন্য

```sql
--  filter groups using having to show only counties with average age above 22
SELECT country, avg(age) FROM students2
 GROUP BY country
    HAVING avg(age) > 22

-- count students born in yeach year
SELECT extract(year from dob) as birth_year, count(*) FROM students2
    GROUP BY birth_year
```

The `GROUP BY` clause in SQL groups rows that have the same values in specified columns into summary rows. It's commonly used with aggregate functions like `COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()` to perform operations on each group of data.

**Example:**

To find the number of customers in each country

```sql
SELECT Country, COUNT(CustomerID) AS NumberOfCustomers
FROM Customers
GROUP BY Country;
```

This query groups the customers by country and counts the number of customers in each group

#### `HAVING` Clause

---

#### ✅ Purpose:

Used to **filter grouped (aggregated)** results after `GROUP BY`.

---

#### 🔑 Key Rules:

- `WHERE` → filters **rows before** grouping
- `HAVING` → filters **groups after** aggregation
- Must be used **with `GROUP BY`**
- Can use aggregate functions (`COUNT()`, `SUM()`, etc.)

<br/>

## Constructing Relationships with Foreign Key Constraints 📄 [→ Code](./foreignKey.sql)

A **foreign key** is a column in one table that refers to the **primary key of another table**. It's used to **enforce referential integrity**, meaning it ensures the relationship between two tables is valid.

<br/>

## Enforcing Referential Integrity: Behaviors During Data Insertion

Post Table এর মধ্যে যেই User Id টা Foreign Key হিসেবে থাকবে সেটি অবশই User table এর User id হতে হবে এর বাইরে কিছু হতে পারবে না ।

INSERT করার সময় Foreign Key এর যেসব Constraint হতে পারে

**Insertion constraints when adding posts:**

- Case 1: Trying to insert a post with non-existent user ID
- Case 2: Adding a post with valid user ID
- Case 3: Attempting to insert a post without a user ID

<br/>

## Enforcing Referential Integrity: Behaviors During Data Deletion

Post Table এর মধ্য থেকে কোন user এর post থাকা অবস্থায় উক্ত User কে User Table থেকে Delete করার ক্ষেত্রে অনেক রকম এর Constraint সেট করা যেতে পারে

**Deletion constraint on DELETE user**

- Restrict Deletion (ON DELETE RESTRICT / NO ACTION)
  - Prevents deletion if related posts exist (Default behavior)
- Cascading Deletion (ON DELETE CASCADE)
  - Automatically deletes all related posts when user is deleted
- Setting NULL (ON DELETE SET NULL)
  - Sets the foreign key to NULL in related posts
- Set Default Value (ON DELETE SET DEFAULT)
  - Sets the foreign key to a default value in related posts

```sql
CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user" (id) ON DELETE CASCADE // delete all post when user is deleted from user table
    user_id INTEGER REFERENCES "user" (id) ON DELETE SET NULL // set user id null in post table FK when user deleted from user table
    user_id INTEGER REFERENCES "user" (id) ON DELETE SET DEFAULT DEFAULT 2 // set default value on post table FK when user is deleted from user table
  )
```

<br/>

## Joining Tables with Inner Join 📄 [→ Code](./join.sql)

দুইটা Table এর মধ্যে Foreign Key এর মাধ্যমে Relation তৈরী হলে , Foreign Key ব্যবহার করে Table দুটো কে Join করা যায় ।

#### 🔗 Common Types of JOINs

| Type         | What it does                                        |
| ------------ | --------------------------------------------------- |
| `INNER JOIN` | Only matching rows from both tables                 |
| `LEFT JOIN`  | All rows from left table + matching ones from right |
| `RIGHT JOIN` | All rows from right table + matching ones from left |
| `FULL JOIN`  | All rows from both tables, matched where possible   |
| `CROSS JOIN` | Cartesian product (every row of A × every row of B) |

Post এবং User Table থেকে একসাথে Post এবং Username get করার জন্য

```sql
-- Joining user table and post table
SELECT title, username from post
INNER JOIN "user" on post.user_id = "user".id
```

```sql
-- Joining user table and post table with table name alias
SELECT * FROM post as p
INNER JOIN "user" as u on p.user_id = u.id
```

## Understanding Left and Right Joins 📄 [→ Code](./join.sql)

Join করার সময় যেই Table Name আগে লেখা হয় তাকে Left Table ধরা হয় এবং যেই Table কে পরে লিখা হয় তাকে Right Table ধরা হয় ।

> Left Join prioritize LEFT TABLE and Right Join Prioritize RIGHT TABLE

- LEFT JOIN / LEFT OUTER JOIN
- RIGHT JOIN / RIGHT OUTER JOIN

তাই Join এর সময় Table এর Order Matter করে ।

- Joining এর সময় যেসব Field গুলো Condition Full Fill করে না সেগুলো দেখানো হলে সেগুলো Null দিয়ে Fill up হয়ে আসে
- Left Join এর বেলায় Left Table এর সব Data দেখাবে এবং Right Table এর শুধুমাত্র যেসব Field Condition Full Fill করবে বা ID match করবে দুই Table এ তাদের কে দেখাবে

```sql
-- left join
SELECT * FROM post as p
LEFT JOIN "user" as u on p.user_id = u.id
```

- Right Join এর বেলায় Right Table এর সব Data দেখাবে এবং Left Table এর শুধুমাত্র যেসব Field Condition Full Fill করবে বা ID match করবে দুই Table এ তাদের কে দেখাবে

```sql
-- right join
SELECT * FROM post as p
RIGHT JOIN "user" as u on p.user_id = u.id
```

## Exploring Full, Cross, and Natural Joins 📄 [→ Code](./crossJoin.sql)

`LEFT JOIN + RIGHT JOIN = FULL JOIN`

Full Join এর মাধ্যমে দুই Table এর সকল Data Return করা হয় । যেসকল Row এর কোন Matching থাকে না সেগুলোকে NULL দিয়ে FILLUP করে দেয় ।

```sql
SELECT * FROM post FULL JOIN "user" on post.user_id = "user".id;
```

**CROSS JOIN**

CROSS JOIN দুইটা টেবিলের প্রতিটি ROW কে একে অপরের সাথে কম্বিন করে।

এতে টোটাল ROW হয় = প্রথম টেবিলের রো × দ্বিতীয় টেবিলের রো

Total Row = first table row \* second table row

**NATURAL JOIN**

দুটো Table এর মধ্যে Common Column থাকলে Natural Join করা যায় । যেখানে Common Column টি কে একবার রাখা হয় ।

**Natural Join**

- Common column অনুযায়ী অটো join হয় (column name + type match করতে হবে)
- `ON` বা `USING` লাগে না
- শুধু matched row-ই আসে
- Common column না থাকলে → empty result
- Total Row = matching row only

```sql
---> Cross Join <-----

SELECT * from employees
CROSS JOIN departments

---> Natural Join <-----

SELECT * from employees
NATURAL JOIN departments
```

## GROUP BY and Aggregate Functions 📄 [→ Code](./empoyee-management.sql)

যেই Column বা Foreign Key Column এর উপর ভিত্তি করে Join করা হয় তাকে `Using` এর মাধ্যমেও লিখা যায় ।

```sql
SELECT * from employee
JOIN department USING (department_id);
```

Group By ব্যবহার করলে `SELECT *` কাজ করবে না যেটা দিয়ে Group BY করা হবে সেটা Select করতে হবে এবং সাথে চাইলে Aggregate Function Use করা যাবে ।

```sql
-- 2. Group By Department with Average Salary
SELECT department_name,
 round(avg(salary)) as "Average Salary" from employee
JOIN department USING (department_id)
GROUP BY department_name
```

## Working with Order Data 📄 [→ Code](./orders.sql)

Orders data provides an excellent example for practicing complex JOINS and relationships in a real-world scenario. The orders module demonstrates how to model relationships between customers, products, and their orders.

```sql
-- Sample query to get total order amount by customer
SELECT c.customer_name, SUM(o.amount) as total_spent
FROM orders o
JOIN customers c ON o.customer_id = c.id
GROUP BY c.customer_name
ORDER BY total_spent DESC;
```

---

<div align="center">

**[⬅️ Back to RDBMS Rockstar](../README.md)**

</div>
