<div style="display: flex; justify-content: center;">

![Modules](https://img.shields.io/badge/Module-6-blue?style=for-the-badge)

</div>


## Understanding Anomalies

**Anomalies in databases refer to inconsistencies or unexpected issues that can occur during data manipulation or retrieval .**

That happens in our database when it’s not properly designed — especially when **data is not normalized**.

These can cause:

- Incorrect results
- Data loss
- Confusing bugs
- Wasted storage
- Inconsistent records

#### There are three main types of anomalies

1. Update Anomalies
2. Delete Anomalies
3. Insert Anomalies

Anomalies দূর করার জন্য Database Normalization করতে হবে ।

</br>

## Understanding Functional Dependency

Functional Dependency means that one attribute's ( or set of attributes) value uniquely determines another attribute's value in a database table

When attribute A determines attribute B, we write it as A → B, meaning B is functionally dependent on A.

A = Determinant

B = Dependent

Equation =

t1.a = t2.a

then, t1.b = t2.b হলে Functional Dependency ache

For example, in a student database:

- StudentID → StudentName (A student ID uniquely determines the student's name)
- CourseID → CourseName (A course ID uniquely determines the course name)

Understanding functional dependencies is crucial for:

- Identifying primary keys
- Eliminating data redundancy
- Proper database normalization

</br>

## Normalization and 1st Normal Forms (1NF)

**Data normalization** is the process of organizing your database tables in a way that **Removes redundancy,** **Improves data integrity** and makes updates and queries **efficient and consistent**

- 0NF → 0 Normal Forms
- 1NF → First Normal Forms
- 2NF → Second Normal Forms
- 3NF → Third Normal Forms

**First Normal Form Rules ——> No Repeating Groups**

- Atomic Values
- Unique Column Names
- Positional dependency data
- Column Should contain data that are same type
- Determine primary key

- Serial No and Course Name together can be a primary key

</br>

## 2nd Normal Forms and Partial Dependency (2NF)

**Second Normal Form (2NF) —> No Partial Dependencies**

- Must be in 1NF
- must not contain any no-prime/non key attribute that is functionally dependent on a proper subset of any candidate key of the relation

দুইটা কলাম বা Attribute মিলে যদি Primary Key গঠিত হয় তাহলে তাকে Composite Primary key বলে ।

একটি Table কে 2nd Normal Form এ হওয়ার জন্য প্রথমে 1st Normal Form এর শর্ত পুরন করতে হবে এবং

Composite Primary Key এর দুটির যে কোন একটি দিয়ে Non Prime বা Non key Column গুলোর কোন টির সাথে Functional Dependency থাকতে পারবে না ।

1st Normal Form কে 2nd Normal Form এ নিয়ে যাওয়ার জন্য Table কে Decompose করার সময় কোন Information Lose হয়ে গেলে তাকে বলে Lossy Decomposition

2NF Rules গুলো ফলো করে সাধারনত Many to Many Relation গুলো বুঝা যায় ।

</br>

## 3rd Normal Forms and Transitive Dependency (3NF)

**3NF Rules —> No Transitive Dependencies**

- **Must be in 2NF**
- Must Not contain transitive dependency

#### Transitive Dependency

X ——→ Y & Y ———> Z

যদি X এর মাধ্যমে Y কে Determined করা যায় এবং Y এর মাধ্যমে Z কে Determined করা যায় তাহলে বলা যায় যে X এর মাধ্যমে Z কে Determined করা যাবে ।

তার মানে এখানে Transitive Dependency আছে ।

</br>

## Resolving Many to Many with Junction Table

Database Design

- Top Down Steps
  - Determining Entities
  - Determining Attributes for each entities
  - Relationships among Entities
  - Solving Many to Many

</br>

## What is Postgres

PostgreSQL, often just called Postgres, is an open-source, object-relational database management system (ORDBMS). It’s known for its stability, performance, and support for advanced features like:

- Open Source
- Full ACID compliance (Atomicity, Consistency, Isolation, Durability).
- RDBMS
- Modern
- Advance Data Types
- Scalability
- Indexing,
- Community support

It’s widely used in both small-scale and enterprise-level applications and is often praised for being developer-friendly and standards-compliant.

**ORDBMS** Stands for **Object-Relational Database Management System**.

It’s a hybrid between a traditional relational database (RDBMS) and object-oriented programming concepts.

</br>

# Normalization Example 3NF

### 🔹 First Normal Form (1NF) — No Repeating Groups

**Goal:** Make sure each column holds atomic (indivisible) values and each record is unique.

❌ Bad Table (Not 1NF):

```
pgsql
Copy code
| StudentID | Name  | Subjects         |
|-----------|-------|------------------|
| 1         | Alice | Math, Science     |

```

✅ Good Table (1NF):

```
pgsql
Copy code
| StudentID | Name  | Subject  |
|-----------|-------|----------|
| 1         | Alice | Math     |
| 1         | Alice | Science  |

```

---

### 🔸 Second Normal Form (2NF) — No Partial Dependencies

**Applies only when composite keys are used.**

**Goal:** Every non-key column must depend on the **whole** primary key, not just part of it.

❌ Bad Table (1NF but not 2NF):

```
lua
Copy code
PK = (StudentID, CourseID)

| StudentID | CourseID | StudentName |
|-----------|----------|-------------|
| 1         | 101      | Alice       |

```

Here, `StudentName` depends only on `StudentID`, not the whole composite key.

✅ Fix (2NF):

```
sql
Copy code
Table: Students
| StudentID | StudentName |
|-----------|-------------|
| 1         | Alice       |

Table: Enrollments
| StudentID | CourseID |
|-----------|----------|
| 1         | 101      |

```

---

### 🔺 Third Normal Form (3NF) — No Transitive Dependencies

**Goal:** Eliminate transitive dependencies.

That means: non-key columns shouldn't depend on **other** non-key columns.

---

Let’s say we have this:

❌ Bad Table (2NF but not 3NF):

```
sql
Copy code
Table: Employees

| EmpID | EmpName | DeptID | DeptName |
|-------|---------|--------|----------|
| 1     | Alice   | 10     | HR       |
| 2     | Bob     | 20     | Sales    |

```

- `EmpID` is the primary key ✅
- `EmpName` depends on `EmpID` ✅
- `DeptID` depends on `EmpID` ✅
- ❌ BUT `DeptName` depends on `DeptID`, not directly on `EmpID` → This is a **transitive dependency**

---

✅ 3NF Fix — Break it into two tables:

**Table: Employees**

```
lua
Copy code
| EmpID | EmpName | DeptID |
|-------|---------|--------|
| 1     | Alice   | 10     |
| 2     | Bob     | 20     |

```

**Table: Departments**

```
lua
Copy code
| DeptID | DeptName |
|--------|----------|
| 10     | HR       |
| 20     | Sales    |

```

Now, all non-key attributes in each table depend **only on the primary key**. That’s clean 3NF.

---

### 🧪 Quick Checklist to Know We are in 3NF

✅ Table is in 2NF

✅ No transitive dependencies

✅ Every non-key column depends **only on the key** (not another column)
