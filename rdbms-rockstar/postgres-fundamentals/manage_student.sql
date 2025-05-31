----------- Table Alteration Tasks ------------

-- Creating student table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    roll INT UNIQUE,
    name VARCHAR(100),
    age INT,
    department VARCHAR(255),
    score INT,
    status VARCHAR(25),
    last_login DATE
)

-- Inserting data into student table
INSERT INTO
    students (
        roll,
        name,
        age,
        department,
        score,
        status,
        last_login)
    VALUES 
        (1001, 'Anik Rahman', 21, 'CSE', 88, 'passed', '2025-05-18'),
        (1002, 'Tania Akter', 22, 'EEE', 72, 'passed', '2025-05-17'),
        (1003, 'Rafiul Hasan', 20, 'BBA', 65, 'passed', '2025-05-16'),
        (1004, 'Sadia Khan', 23, 'CSE', 45, 'failed', '2025-05-15'),
        (1005, 'Naim Islam', 21, 'EEE', 59, 'passed', '2025-05-14'),
        (1006, 'Mehzabin Alam', 22, 'ENG', 80, 'passed', '2025-05-13'),
        (1007, 'Shahriar Nafi', 20, 'CSE', 90, 'passed', '2025-05-12'),
        (1008, 'Tamanna Zaman', 22, 'CSE', 30, 'failed', '2022-05-11'),
        (1009, 'Arefin Rafi', 24, 'BBA', 68, 'passed', '2025-05-10'),
        (1010, 'Jannat Jahan', 21, 'EEE', 85, 'passed', '2025-05-09'),
        (1011, 'Rakib Chowdhury', 23, 'CSE', 39, 'failed', '2025-05-08'),
        (1012, 'Maliha Noor', 22, 'ENG', 75, 'passed', '2025-05-07'),
        (1013, 'Zarif Hossain', 21, 'CSE', 94, 'passed', '2021-05-06'),
        (1014, 'Fahmida Kabir', 20, 'BBA', 62, 'passed', '2025-05-05'),
        (1015, 'Rony Ahmed', 23, 'EEE', 40, 'failed', '2025-05-04'),
        (1016, 'Farzana Sultana', 21, 'ENG', 82, 'passed', '2025-05-03'),
        (1017, 'Arif Mahmud', 22, 'CSE', 47, 'failed', '2020-05-02'),
        (1018, 'Sultana Jahan', 24, 'EEE', 76, 'passed', '2025-05-01'),
        (1019, 'Kawsar Rahman', 22, 'BBA', 50, 'passed', '2025-04-30'),
        (1020, 'Nusrat Anjum', 21, 'ENG', 89, 'passed', '2025-04-29');


-- Adding a new column 'Email'
ALTER TABLE students
 ADD COLUMN email VARCHAR(25) DEFAULT 'default@mail.com' ;

-- RENAME email table to student_email
ALTER TABLE students
RENAME COLUMN email to student_email;

-- Adding unique constraint to student_email
ALTER TABLE students
 ALTER COLUMN student_email set NOT NULL


-- creating a new table
CREATE TABLE courses(course_id SERIAL, course_name VARCHAR(100)) ;


-- adding unique key to courses
ALTER TABLE courses 
  ADD constraint pk_courses_id PRIMARY KEY (course_id)

-- adding a column to courses
ALTER TABLE courses
 ADD COLUMN course_fee INT ;


-- deleting a column from courses
ALTER TABLE courses 
 DROP COLUMN course_fee;

SELECT * from students


------> Filtering and Logical Operation <-------
-- selecting students with score 80 higher
SELECT * FROM students
    WHERE score > 80 AND score IS NOT NULL 

-- excluding students fo EEE department
SELECT * FROM students 
    WHERE NOT department = 'EEE'


-- Fetch students whose names start with ‘A’ using LIKE and ILIKE
SELECT * FROM students
    WHERE name LIKE 'A%';

SELECT * FROM students
    WHERE name ILIKE 'A%';

-- Select all students whose age is between 18 and 25.

SELECT * FROM students 
    WHERE age BETWEEN 18 and 25 ;

-- Retrieve rows using IN for a specific set of roll numbers.
SELECT * from students
    WHERE roll IN (1002, 1004, 1008, 1010)


-------> Aggregate functions <----
   -- Count how many students exist in the students table.
 SELECT count(*) FROM students;  

--  Find the average score of students in a specific department CSE

SELECT avg(score) as "Average Score" FROM students
WHERE department = 'CSE';

-- Get the maximum age
SELECT max(age) as "Maximum Age"from students

-- Get the minimum age
SELECT min(age) as "Maximum Age"from students


--------> Update & Delete Operations <---------
-- Update the status of students who scored less than 70 to 'failed'.
UPDATE students 
    set status = 'failed'
    WHERE score < 70

    SELECT * from students ;


-- Delete students who have not logged in since last year.
DELETE FROM students
WHERE last_login < CURRENT_DATE - INTERVAL '1 year';


-- Use LIMIT and OFFSET to fetch the second page of results (5 per page).

SELECT * FROM students ORDER BY id LIMIT 5 OFFSET 5 * 1