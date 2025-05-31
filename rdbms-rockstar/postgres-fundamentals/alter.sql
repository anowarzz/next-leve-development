-- Active: 1747462889273@@127.0.0.1@5432@ph

SELECT * FROM person2 ;

-- Adding a new column
ALTER TABLE person2
ADD COLUMN email VARCHAR(25) DEFAULT 'default@mail.com' NOT NULL;

-- Inserting a row to the table
INSERT INTO person2 
VALUES(10, 'pheobe', 22, 'mail@gmail.com')

-- Dropping or removing a column
ALTER TABLE person2
DROP COLUMN email;

-- Renaming a column
ALTER TABLE person2
RENAME COLUMN "name" to user_name;


-- Changing column data type
ALTER TABLE person2
ALTER COLUMN user_name TYPE VARCHAR(50);

-- adding constraints to a column
ALTER TABLE person2
ALTER COLUMN user_age set NOT NULL;

-- removing a  constraints from a column
ALTER TABLE person2
ALTER COLUMN user_age drop NOT NULL;


-- Adding unique constraints
ALTER TABLE person2
ADD constraint unique_person2_name UNIQUE(user_name);

-- Adding unique constraints
ALTER TABLE person2
DROP constraint unique_person2_name ;

-- -- Adding primary key
-- ALTER TABLE person2
-- ADD constraint pk_person2_age PRIMARY KEY(user_age);

DROP TABLE friends;