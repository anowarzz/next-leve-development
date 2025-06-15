<div style="display: flex; justify-content: center;">

![Modules](https://img.shields.io/badge/Module-7-red?style=for-the-badge)

</div>

## PSQL and its Default Behavior, Creating Database

PSQL Command

```sql
-- Connection commands
psql -d <db-name> -U <username> -W            -- Connect to local database
psql -h <host> -d <db-name> -U <username> -W  -- Connect to remote database

-- Navigation commands
\l                  -- List all databases
\c <db-name>        -- Switch to database
\dt                 -- List tables
\d <table-name>     -- Describe table
\dn                 -- List schemas
\du                 -- List users/roles
\df                 -- List functions
\dv                 -- List views

-- Database operations
CREATE DATABASE <db-name>;
DROP DATABASE <db-name>;


```

Normally PSQL এর মধ্যে দুটি template database থাকে যেগুলো নতুন Database তৈরীর করার ক্ষেত্রে Blue Print এর মত কাজ করে ।

<br/>

## User, Role and Privilege Management in POSTGRES

**What Is Schema ?**

A **schema** is a **logical container** within a PostgreSQL database that organizes and groups database objects such as tables, views, functions, indexes, and more. It serves as a namespace to prevent naming conflicts, allowing us to have objects with the same name in different schemas. It also provides a way to logically organize database structures and manage access control.

- Attributes হলো কতগুলো Privilege এর Collection .
- Database এর মধ্যে অনেকগুলো User Create করে সেই অনুযায়ী সবাইকে আলাদা আলাদা Permission প্রদান করাই হলো Standard পদ্ধতি ।

- Creating a user and creating a role

`create user user1 with login encrypted password '123456';
create role role1 with login encrypted password '123456';`

- login with user1 in postgres database

`psql -U user1 -d postgres`

- creating a table

`create table test_table (name varchar(50))`

- inserting data into the table

`insert into test_table(name) values('mathew');`

<br/>

## Granting and Revoking Privileges

বিভিন্ন Command এর মাধ্যমে Database এর user দের কে Permission Grant and Revoke করা যায় ।

- Retrieving all data from a table

`select * from test_table;`

- Giving super permission on all tables

`grant all privileges on all tables in schema public to user1;`

- Giving all permission to user1 for table test_table only

`grant all privileges on table test_table to user1;`

- insert a data into table test_table

`insert into test_table(name) values('test');`

- Revoking all permission from a user

`revoke all privileges on table test_table from user1;`

- Giving permissions to a specific roles

`grant select on all tables in schema public to role1;`

<br/>

## Structured Query Language (SQL)

**SQL (Structured Query Language)** is a standard programming language used to manage and manipulate relational databases by performing tasks like querying, inserting, updating, and deleting data.

It’s **declarative**, meaning you tell it _what_ to do, not _how_ to do it.

- SQL Query এর মধ্যে থাকে `clauses` `expressions` `predicates` `queries` `statements` `procedures` `functions` `operators` `data types` `constraints`

.

<br/>

## Create, Update and Delete Database and Data Types in POSTGRES

- Create Database

`CREATE DATABASE test;`

- Create database mentioning the template name

`CREATE DATABASE mydb TEMPLATE template1;`

মুলত update এর কাজে Alter ব্যবহার করা হয় ।

- Renaming Database

`alter database test rename to ph;`

Table তৈরী করার সময়, Column এর Data type বলে দিতে হবে ।

#### Benefits Of Data type

- Data consistency
- Convenience and Functionality
- Performance
- Storage Efficiency
- Constraint Enforcement

Data Types

1. Boolean Data Type
   - true
   - false
   - null
2. Number Data / Integer

- INT
- SmallINT
- BIGINT

3. String / Character

4. UUID

<br/>

## Creating a Table with Multiple Columns and Different Data Types

Table create করার জন্য Rules হলো

```sql
CREATE TABLE table_name (
    column1 data_type [constraints],
    column2 data_type [constraints],
    ...
);
```

> Table এর নাম দেয়ার সময় সব সময় Singular নাম দিতে হবে । যেমন User —> not users

<br/>

## Creating a Table with Multiple Columns and Column Constraints

একটি Column এর Data type এর মধ্যে বিভিন্ন রকম Constraints সেট করে দেয়া যায় ।

**Constraints Types**

- Not Null =⇒ value can’t be null
- Unique =⇒ value must be unique
- Primary Key =⇒ primary key is combination of `‘Not Null’ + Unique`
- Foreign Key

- Default ⇒ set Default value
- Check ⇒ Check for a condition to meet `age INTEGER CHECK (age ≥18)`

<br/>

## Different Methods to Define Constraints

বিভিন্ন ভাবে Column গুলোর value তে constraints সেট করা যায়

**`UNIQUE(user_name, age)`**

এর মানে হলো কোন Row এর মধ্যে user name এবং age এই দুইটা Field হুবহু হতে পারবে না ।

Constraints in a table

```sql

CREATE  TABLE person2 (
id SERIAL ,
user_name VARCHAR(20) NOT NULL ,
age INT CHECK (age >=18),
PRIMARY KEY(id, user_name),
UNIQUE(user_name, age)

);

```

<br/>

## Inserting Data into a Table and Checking Constraints

**Inserting Data Into Table**

- Single Row Insert

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3) ;
```

```sql
INSERT INTO employees (first_name, last_name, hire_date)
VALUES ('John', 'Doe', '2025-5-17') ;
```

- Multiple Row Insert

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES
    (value1, value2, value3),
    (value4, value5, value6),
    (value7, value8, value9);
```

```sql
INSERT INTO employees (first_name, last_name, hire_date)
VALUES
    ('John', 'Doe', '2025-5-17'),
    ('Jane', 'Smith', '2025-5-18'),
    ('Mike', 'Johnson', '2025-5-19');
```

`Without mentioning the column name` it has drawbacks —> not a good approach

```sql
INSERT INTO employees
VALUES
    ('John', 'Doe', '2025-5-17'),
    ('Jane', 'Smith', '2025-5-18'),
    ('Mike', 'Johnson', '2025-5-19');
```
