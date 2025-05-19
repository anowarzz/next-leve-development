-- Active: 1747462889273@@127.0.0.1@5432@ph

-- creating a table 
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NUll,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    grade char(2),
    course VARCHAR(50),
    email VARCHAR(100),
    dob DATE,
    blood_group VARCHAR(5),
    country VARCHAR(50)
) ;


INSERT INTO students (first_name, last_name, age, grade, course, email, dob, blood_group, country) VALUES
('Alice', 'Johnson', 20, 'A', 'Mathematics', 'alice.johnson@example.com', '2004-01-15', 'A+', 'USA'),
('Bob', 'Smith', 21, 'B', 'Physics', 'bob.smith@example.com', '2003-06-20', 'O-', 'UK'),
('Charlie', 'Brown', 22, 'C', 'Chemistry', 'charlie.brown@example.com', '2002-09-10', 'B+', 'Canada'),
('Diana', 'Prince', 23, 'A', 'Biology', 'diana.prince@example.com', '2001-11-05', 'AB+', 'Australia'),
('Ethan', 'Hunt', 24, 'B', 'Computer Science', 'ethan.hunt@example.com', '2000-12-12', 'O+', 'Germany'),
('Fiona', 'Gallagher', 20, 'A', 'Economics', 'fiona.g@example.com', '2004-02-18', 'B-', 'Ireland'),
('George', 'Williams', 21, 'C', 'History', NULL, '2003-07-09', 'A-', 'USA'),
('Hannah', 'Lee', 22, 'B', 'Philosophy', 'hannah.lee@example.com', '2002-08-13', 'AB-', 'South Korea'),
('Ian', 'Thomas', 23, 'A', 'Engineering', NULL, '2001-03-03', 'O+', 'India'),
('Jasmine', 'Patel', 19, 'B', 'Psychology', 'jasmine.patel@example.com', '2005-05-24', 'A+', 'India'),
('Kevin', 'Nguyen', 20, 'A', 'Architecture', 'kevin.nguyen@example.com', '2004-10-11', 'B+', 'Vietnam'),
('Luna', 'Garcia', 22, 'B', 'Design', NULL, '2002-04-22', 'O-', 'Spain'),
('Mason', 'Lopez', 21, 'C', 'Literature', 'mason.lopez@example.com', '2003-01-30', 'A-', 'Mexico'),
('Nora', 'Khan', 23, 'A', 'Law', 'nora.khan@example.com', '2001-09-17', 'AB+', 'Pakistan'),
('Oscar', 'Martinez', 24, 'B', 'Music', 'oscar.martinez@example.com', '2000-07-07', 'O+', 'Brazil'),
('Priya', 'Sharma', 20, 'A', 'Medicine', 'priya.sharma@example.com', '2004-06-14', 'B-', 'India'),
('Quentin', 'Wright', 22, 'C', 'Geology', NULL, '2002-03-25', 'A+', 'USA'),
('Riya', 'Singh', 21, 'A', 'Sociology', 'riya.singh@example.com', '2003-08-08', 'B+', 'India'),
('Sam', 'O’Connor', 23, 'B', 'Political Science', 'sam.oconnor@example.com', '2001-02-19', 'AB-', 'Ireland'),
('Tina', 'Zhou', 20, 'A', 'Statistics', 'tina.zhou@example.com', '2004-12-01', 'O-', 'China');

-- showing column name alias
SELECT email as "Student Email Account" from students ;

-- sorting while select
SELECT * from students ORDER BY dob DESC;

-- unique or distinct data
SELECT DISTINCT blood_group from students;


--  Data filtering
-- Select Student from USA Only
SELECT * from students
  WHERE country = 'USA';

-- Select student with a grade in law
SELECT * from students
  WHERE grade = 'A' and course = 'Law';


-- Select student with blood group A
SELECT * from students
  WHERE blood_group = 'A+';

-- select student from usa or australia
SELECT * from students
  WHERE country = 'USA' OR country = 'Australia' ;


-- select student from usa or australia with age 20
SELECT * from students
  WHERE (country = 'USA' OR country = 'Australia') and age = 20 ;


-- age greater than 20
SELECT * from students
  WHERE age > 20;

--  country is not equal to usa
SELECT * from students
  WHERE country <> 'USA';

SELECT * from students;

-- make all the student first name to capital
SELECT upper(first_name) as "Student Name", * from students ;

-- concate multiple value (first_name+last_name) 
SELECT concat(first_name, ' ', last_name) FROM students ;

--  length of first name
SELECT length(first_name) from students ;


-- age average
SELECT avg(age) from students ;


-- max age
SELECT max(age) from students ;

-- min age
SELECT min(age) from students ;

--  sum of age
SELECT sum(age) from students ;


--  max length of first name
SELECT max(length(first_name)) from students ;

--  negation not
SELECT * from students 
 WHERE NOT country = 'USA'


--  student whose email null
SELECT * from students
 WHERE email IS NULL


--  student whose email not null
SELECT * from students
  WHERE email IS NOT NULL


--   show a default value for null
SELECT COALESCE(email, 'Email Not Provided') as "Student Email" from students


-- null if
SELECT NULLIF(grade, 'B') FROM students WHERE first_name = 'Bob';

-- IN Clause
SELECT * from students
  WHERE country NOT IN ('USA', 'India', 'UK')

-- between 
SELECT * from students
 WHERE age BETWEEN 20 and 22


--  between in dates
SELECT * from students
    WHERE dob BETWEEN '2000-01-01' and '2005-1-1' ORDER BY dob ;

-- LIKE for string match

SELECT * from students
  WHERE first_name LIKE 'A%'    

--  with _ wildcard
SELECT * from students
  WHERE first_name ILIKE '___a_'