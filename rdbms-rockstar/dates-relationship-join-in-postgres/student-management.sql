-- Active: 1747462889273@@127.0.0.1@5432@ph2@public

-- creating student table
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department_id INTEGER REFERENCES department (id) ON DELETE SET NULL,
    last_login DATE
)


-- creating department table
CREATE TABLE department ( id SERIAL PRIMARY KEY, name VARCHAR(100) )

-- creating course table
CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100)
)


-- inserting data to department table
INSERT INTO department (name) VALUES
('Computer Science'),
('Electrical Engineering'),
('Mechanical Engineering'),
('Mathematics'),
('Physics');


-- inserting data into student table
INSERT INTO student (name, department_id, last_login) VALUES
('Alice', 1, '2025-05-10'),
('Bob', 1, '2025-05-15'),
('Charlie', 2, '2025-04-28'),
(NULL, 4, '2025-05-18'),
('Evan', 2, '2025-05-20'),
('Fiona',NULL,'2025-03-12'),
('George',NULL,'2025-05-05'),
('Hannah',NULL, '2025-02-18'),
(NULL, 1, '2025-01-01'),
('Jack', 5, NULL);  -- student hasn't logged in yet

INSERT INTO student ( name, department_id, last_login ) VALUES  ('Joe', 5, '2025-04-15') ;


-- inserting data into course table
INSERT INTO course (title) VALUES
('Data Structures'), ('Algorithms'), ('Circuit Analysis'),
('Thermodynamics'), ('Linear Algebra'), ('Quantum Physics'),
('Machine Learning'), ('Database Systems'), ('Operating Systems'),
('Control Systems');

DROP TABLE student

DROP TABLE department
-------> Date & Grouping Tasks <---------

-- Retrieve students who have logged in within the last 30 days.
SELECT name from student WHERE last_login > CURRENT_DATE - INTERVAL '30 days' 

-- Extract the login month from the last_login and group students by month.

SELECT extract(month FROM last_login) as login_month, count(*) FROM student WHERE last_login IS NOT NULL GROUP BY login_month 

-- Count how many students logged in per month and show only those months where login count is more than 3.
SELECT extract(month from last_login) as login_month, count(*) as total_login from student WHERE last_login IS NOT NULL GROUP BY login_month HAVING count(*) > 3 ORDER BY login_month



--------> Foreign Key & Constraints <--------
-- Create a foreign key constraint on department_id in the students table referencing departments(id).
-- Try inserting a student with a department_id that doesn’t exist and observe the behavior.
-- Delete a department and see how students are affected using ON DELETE CASCADE and ON DELETE SET NULL.



DELETE from department WHERE id = 1 ;

SELECT * from department

SELECT * from student


-------->  Join Operations <-----
-- Join students and departments using INNER JOIN to display each student's department name.
SELECT * FROM student
 INNER JOIN department on student.department_id = department.id

--  Use a LEFT JOIN to show all students including those without a department.

SELECT 
    student.id AS student_id,
    student.name AS student_name,
    department.name AS department_name
FROM student
LEFT JOIN department ON student.department_id = department.id;

-- Use a RIGHT JOIN to show all departments including those without students.
SELECT 
  *
FROM department
RIGHT JOIN student ON department.id = student.department_id;


ALTER TABLE department RENAME COLUMN id TO department_id;

-- Perform a FULL JOIN to get all records from both students and departments
SELECT * FROM student
FULL JOIN department ON student.department_id = department.id;

-- Create a cross-product of all students and courses using CROSS JOIN.
SELECT * from student
CROSS JOIN course


-- Use NATURAL JOIN between tables that have a shared column like department_id
SELECT * FROM student
NATURAL JOIN course