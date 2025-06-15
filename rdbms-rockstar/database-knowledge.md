<div style="display: flex; justify-content: center;">

![Modules](https://img.shields.io/badge/Module-5-blue?style=for-the-badge)

</div>

## Understanding Data, Information and Database\*\*

**What is Database ?**

A database is a structured collection of related data that represents some real world entities and organized for efficient retrieval, storage and management

- Database logo mostly came from drum memory structure

**What is Data ?**

Data is facts that can be recorded in the form of

**What is Information ?**

Information is processed and organized data that provides meaningful context , insight or knowledge .

</br>

## What is DBMS and Why

DBMS ⇒ Database Management System

RDBMS ⇒ Relational Database Management System

Database ম্যানেজ করার জন্য যেসব software ব্যবহার করা হয় তাকে DBMS বলে

**Cons of Storing Data Using File System**

- Unstructured Data, multiple formats(.txt.mp4 etc)
- Data redundancy
- Data Inconsistency
- No concurrency protocol
- Security Issue
- Access Complicate

Database Management System যে Language Use করে সেটা হলো SQL ⇒ Structured Query Language

| Relational | Document        | Key Value |
| ---------- | --------------- | --------- |
| MY SQL     | MONGODB         | REDIS     |
| POSTGRESQL | AMAZON DYNAMODB |           |
| SQLITE     |                 |           |
| SQL SERVER |                 |           |

</br>

## Different types of Database Model and Relational Model

**Database Model :**

- Hierarchical ⇒ Tree structure data store
- Network
- Relational
- Document
- Key Value

Relational Model কেনো আসলো বা এর আগের Model গুলোর Drawback কি ছিলো :

**Hierarchical Model** এ Tree Structure এ Data Store হত তবে যে সমস্যা ছিলো তা হলো কোন Child node এর একটার বেশি Parent থাকতে পারত না । তাই যদি এমন দরকার হত যে একটি Child node একাধিক Parent এর Under এ থাকবে সেটি Possible ছিলো না ।

এই সমস্যার সমাধান হিসেবে পরে আসে Network Model

**Network Model**

Hierarchical Model এর সমসার সমাধান করলেও Network Model এর যে সমস্যা গুলো ছিল তা হলো

- **Complexity**

Navigational Complexity :

User had to navigate through a network pointers to access or modify data, making it less intuitive than relational database

- **Schema Definition**

Defining a schema definition in a Network model could be more complex compared to the relational model

and Updating the schema was more complex

- **Lack Of Standardization**

Unlike relational model it did not have any standard query language and any standard rules

#### Relational Databse

Relational Database Stores data in table format and key is used as unique identifier .

Creating relation between table and maintaining the relation all the process are predefined .

</br>

## Anatomy of a Table/Relation

Database এর জন্য সর্বপ্রথম Entity গুলো Define করতে হবে । যেমন একটি Ecommerce Website এর Entity গুলো হবে । User, Order , Products Etc

- Table কে Relation ও বলা হয়
- Table এ থাকে Column & Row
- Column/Attribute সেম জিনিস
- Row/ Record / Tuple সেম জিনিস
- Collection of column কে Degree বলে
- Collection of Row কে Cardinality বলে
- Column এ কোন নির্দিষ্ট Domain এর data থাকে বা Constraints থাকে

</br>

## What is Key and Super Key

A Key in a relational database is a field or combination of fields that uniquely identifies a record in a table .

**Type Of Keys**

**Super Key**

Super key is a Attribute or set of attribute by which we can identify each row uniquely.

- Could be a single attribute or a set of attributes
- Could have null values in the set
- It actually a superset

1. Candidate Key
2. Primary Key
3. Alternate Key
4. Composite Key
5. Foreign Key

</br>
## Candidate, Primary, Alternate and Composite Key

#### Candidate Key

- Super key whose proper subset is not a super key
- Also called Minimal Super Key
- Potential Primary Key : From the candidate keys, one is chosen as the primary key . However all candidate keys are potential choices for the primary key .

#### Primary Key

From the candidate keys , one key is chosen as the primary key for the table. The primary key is a specific candidate key that is selected as the main identifier of the records in that table

⇒ Should be **unique, not null and stable**

#### Alternate Key

⇒ Candidate Keys which were not chosen as primary key are the alternate key

#### Composite Key

⇒ Generally Composite Key means

A **composite key** refers to **two or more columns combined to uniquely identify a row** in a table

⇒ Composite Primary Key

A **composite key** is a primary key made up of two or more columns that together uniquely identify a row in a table.

</br>

## Explaining Foreign Keys

**Foreign key** is a column in one table that **links to the primary key of another table**, helping to **connect related data** between the two tables.

</br>

## Techniques to Design Database

**SDLC** stands for **Software Development Life Cycle**—it’s the process used to **plan, create, test, and deploy software** in a structured way.

#### 🔁 Main Steps of SDLC:

1. **Planning** – Decide how the project will be done, including time and resources.
2. **Requirement Gathering & Analysis** – Understand what the software needs to do.
3. **System Design** – Create architecture and UI/UX design (blueprint of the system).

Database Design is done under this step

1. **Development (Implementation)** – Actually write the code.
2. **Testing** – Check for bugs and make sure everything works correctly.
3. **Deployment** – Release the software to users.
4. **Maintenance** – Fix bugs and make improvements after it's live.

#### SDLC METHODS

#### ✅ **Top SDLC Methodologies**

1. **Agile** – Emphasizes flexibility, iterative progress, and customer collaboration.
2. **Waterfall** – A linear and sequential approach, best for projects with well-defined requirements.
3. **Scrum** – An Agile framework focusing on fixed-length iterations called sprints.
4. **DevOps** – Combines development and operations to enhance collaboration and automate processes.
5. **Lean** – Focuses on minimizing waste and delivering value quickly.

#### Purpose of Database Design

Structure organization for efficient data management

**Database Design Techniques :**

1. Top Down =⇒ Start Design From zero
2. Bottom Top =⇒ Design On Existing System
3. Hybrid Approach ⇒ Combined Both

</br>

## Steps of Top-down Technique

**Entity Relationship (ER) Diagram**

An Entity Relationship Diagram is a visual representation used in database design to illustrate the relationship between entities . It Shows how different entities in a database relate to each other through various types of relationship like , one to one , one to many or many to many

#### Top Down Steps

- Determining Entities

1. Place, Person or thing
2. Properties Or Attributes
3. Unique Identity
4. SIngular Name
5. Should more than one content of data

- **Determining Attributes for each Entities**

1. Should be related to the entity
2. Should be atomic
3. Should have keys

- **Relationship among Entities**

</br>

## Relationship and Relationship Cardinality

1 to 1

1 to Many

Many to One

Many to Many

Relationships means : Connection between entity or tables

Relationship Cardinality in databases specifies how many instances of one entity are associated with how many instances of another entity
