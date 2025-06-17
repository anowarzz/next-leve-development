# 🚀 Advanced Queries & Database Objects - Learning Notes

<div align="center">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Module](https://img.shields.io/badge/Module-11-red?style=for-the-badge)



</div>

---

## 📚 Module Overview

This module takes a deep dive into PostgreSQL's advanced querying capabilities and database objects. We'll explore how to write complex queries, create reusable database components, and optimize database performance. These are my personal learning notes.

## 🎯 Topics Covered

- ✅ Subqueries and nested queries
- ✅ Views for simplified data access
- ✅ Functions for reusable logic
- ✅ Stored procedures for complex operations
- ✅ Triggers for automated responses
- ✅ Indexing for performance optimization

---

## 📝 My Learning Notes

<br>

## Exploring Subqueries 📄 [→ Code](./sub-query.sql)

What is Sub Query ?

Sub query is a nested query within another SQL statement

Select Clause এর সাথে সব সময় এমন Sub query use করতে হবে যেটা সব সময় একটা Single value Return করে ।

#### 📌 **Subquery (Nested Query) – PostgreSQL**

- A **subquery** is a query inside another query.
- Enclosed in parentheses `()` and used in `SELECT`, `FROM`, or `WHERE` clauses.

#### 🔥 **1. Scalar Subquery (Most Common)**

- ✅ Returns **a single value** (multiple row, one column).
- 🔹 Used in `SELECT`, `WHERE`, or `HAVING` clauses.
- 💡 Common for filtering or calculating thresholds.
- **Example:**

  ```sql

  SELECT name FROM employees
  WHERE salary > (SELECT AVG(salary) FROM employees);
  ```

---

#### 🔥 **2. Table Subquery (Also Very Common)**

- ✅ Returns **a full result set** (like a temp table).
- 🔹 Used in `FROM` clause.
- 💡 Useful for breaking complex queries into parts.
- **Example:**
  ```sql
  SELECT name FROM (
    SELECT name, salary FROM employees WHERE salary > 5000
  ) AS high_paid;
  ```

---

#### 🔥 **3. Correlated Subquery (Common but Slower)**

- ✅ Refers to a column from the outer query.
- 🔹 Runs once **per row** of the outer query.
- 💡 Often used in `WHERE` or `SELECT`.
- **Example:**

  ```sql

  SELECT name FROM employees e
  WHERE salary > (
    SELECT AVG(salary) FROM employees WHERE department = e.department
  ```

<br/>

## Utilizing Subqueries in Different Clauses 📄 [→ Code](./sub-query.sql)

```sql
-- Can return a single value
-- Can return multiple rows
-- Can return a single column
```

```sql
SELECT *, (SELECT sum(salary) as salary_sum FROM employee) FROM employee

---

SELECT * --// outer query
FROM (
        SELECT department_name, sum(salary)
        FROM employee
        GROUP BY
            department_name
    ) as avg_salary -- // sub query
```

Sub Query ব্যবহার করার সময় খেয়াল রাখতে হবে যে Outer Query এর সাথে sub query এর Result Compatible কিনা ।

- Comparison Operator `< >` এর সাথে Sub Query ব্যবহার করলে ঐ Sub query অবশই একটি Single Value Return করবে ।

```sql
-- sub query returning multiple row
    SELECT employee_name, salary, department_name FROM employee
     WHERE  department_name in (
        SELECT department_name FROM employee WHERE department_name LIKE ('%R%')
    )
```

- `IN` এর মধ্যে একটি Single Column এর Data দিতে হবে । Multiple Column এর Data দিলে কাজ করবে না

<br/> 
## Exploring Views in PostgreSQL 📄 [→ Code](./views.sql)

Javascript এর মধ্যে আমরা যেমন একটি Repetitive কাজকে বার বার করার জন্য Function লিখে থাকি তেমনই SQL এর মধ্যে VIEW হলো এমন একটি বিষয়

- কোন Complex Query কে একটি Variable এর মধ্যে রেখে তা বার বার ব্যবহার করা যায় View এর মাধ্যমে

1. Materialized View
2. Non Materialized View

**Views are virtual tables generated from the result of a SQL query**

- 📄 **View = Virtual Table**: It stores a SQL query, not actual data.
- 🧠 **Simplifies Complex Queries**
- **Enhance Data Abstraction**
- 🔐 **Restricts Data Access / Improved Security** : Can expose only selected columns or rows
- 🔄 **Automatically Reflects Changes**: Any update in base tables shows in the view.

**Key Points**:

- Returns a **table-like** result
- Cannot accept parameters
- Usually read-only (but can be made updatable in some cases)
- Good for **reporting, dashboards**, or **reusable queries**

```sql
-- creating a view
CREATE VIEW dept_avg_salary
AS
SELECT department_name, avg(salary) FROM employee GROUP BY department_name ;
```

```sql
-- using the view
SELECT * from dept_avg_salary;
```

<br/>

## Exploring Functions in PostgreSQL 📄 [→ Code](./function.sql)

যেসব Query বার বার লিখার দরকরা হতে পারে সেগুলোকে একটি Function এর মধ্যে লিখলে সেই Function বিভিন্ন সময় বার বার ব্যবহার করা যায় ।

```sql
-- function with a PARAMETER
CREATE OR REPLACE FUNCTION delete_emp_by_Id (p_emp_id INT)
RETURNS void
LANGUAGE SQL
AS
$$
 DELETE FROM employee WHERE employee_id = p_emp_id
$$

SELECT delete_emp_by_id(29)

-- CASE Expression in postgres
SELECT * ,
CASE
    WHEN salary > 50000 AND salary < 69000 THEN 'Cool Job'
    WHEN salary > 70000 THEN 'Fire Job'
    ELSE 'Dead Job'
END AS job_type
FROM employee
```

<br/>

## Exploring Stored Procedure in PostgreSQL 📄 [→ Code](./procedure.sql)

Functions এবং Procedure এর মধ্যে প্রধান Difference হলো Function কোন কিছু Return করতে পারে কিন্তু Procedure কোন কিছু Return করতে পারে না ।

procedure এর মধ্যে চাইলে Variable Declare করা যেতে পারে

```sql
-- creating a procedure
CREATE OR REPLACE Procedure remove_emp_by_id(p_emp_id INT)
LANGUAGE plpgsql
AS
$$
DECLARE
test_var INT;
BEGIN
SELECT employee_id INTO test_var FROM employee WHERE employee_id = p_emp_id ;
DELETE FROM employee WHERE employee_id = test_var;

RAISE NOTICE 'Employee Removed Successfully';

END
$$;

call remove_emp_by_id(25);
```

<br/>

## Practical Implementation of Triggers in PostgreSQL 📄 [→ Code](./trigger.sql)

**A trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions.**

- - Table-Level Events:
    -- INSERT, UPDATE, DELETE, TRUNCATE
    -- Database-Level Events
    -- Database Startup, Database Shutdown, Connection start and end etc
- - CREATE TRIGGER trigger_name
    -- {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
    -- ON table_name
    -- [FOR EACH ROW]
    -- EXECUTE FUNCTION function_name();

Postgres এর মধ্যে Trigger তৈরী করলে Trigger এর মধ্যে একটা Function দিতে হয় । এটা Postgres Specific । অন্য RDBMS এর মধ্যে Trigger এর ভিতরেই বলতে হয় যে কি করতে হবে ।

- TRIGGER এর জন্য যেই Function তৈরী করতে হয় তাকে বলে Trigger Function
- TRIGGER Function এর RETURN TYPE হবে TRIGGER

Example Code Of Trigger

```sql
CREATE TABLE my_users (
    user_name VARCHAR(50),
    email VARCHAR(100)
)

INSERT INTO
    my_users
VALUES ('Max', 'verstappen@gmail.com'),
    (
        'charles',
        'leclarc@gmail.com'
    )

CREATE TABLE deleted_user_audit (
    deleted_user_name VARCHAR(50),
    deletedAt TIMESTAMP
)

CREATE OR REPLACE FUNCTION save_deleted_user()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN
    INSERT INTO deleted_user_audit VALUES(OLD.user_name, now()) ;

    RAISE NOTICE 'User Audit Log Created' ;
    RETURN OLD;
END
$$

CREATE OR REPLACE Trigger save_deleted_user_trigger
 BEFORE DELETE
 ON  my_users
 FOR EACH ROW
EXECUTE FUNCTION save_deleted_user () ;

SELECT * FROM deleted_user_audit

DELETE FROM my_users WHERE user_name = 'Max';
```

<br/>

## Indexing Techniques in PostgreSQL

A database index is a strategically designed data structure that enhances the speed of data retrieval activities in a database table

যেসব Field Select করে বার বার Query করা হয় সেগুলোকে Index করে রাখলে Query Faster হয় ।

Indexing এর মাধ্যমে Full Table Scan কে Avoid করা হয় ।

```sql
SELECT * FROM employee

EXPLAIN ANALYSE
SELECT * FROM employee WHERE employee_name = 'David Lee'

-- creating a index on employee_name
CREATE INDEX idx_employee_employee_name on employee(employee_name)

```

<br/>

## Understanding How Indexing Works in PostgreSQL

Postgres আমাদের মেশিনে Hip File এর মধ্যে Data গুলো কে Binary আকারে রাখে ।

আমাদের data গুলোকে সে Hip file এর মধ্যে বিভিন্ন block এর মধ্যে ভাগ করে রাখে ।

আমরা Query Run করলে সে এই Hip File এর Content গুলো কে Memory তে নিয়ে যায় এবং সেখান থেকে খুজে Query গুলো বাস্তবায়ন করে ।

Table থেকে Data খুজতে অনেকভাবে scan করে থাকে । যেমন Full Table Scan । indexing এর মাধ্যমে Full Table Scan কে skip করা হয় ।

- Primary Key এর মধ্যে Implicitly একটা Indexing করা হয়ে থাকে ।

Indexing এর বেশি কিছু Algorithm আছে যেমন

- B-TREE (Default)
- Hash
- GIN
- GIST

---

<div align="center">

**[⬅️ Back to RDBMS Rockstar](../README.md)**

</div>
