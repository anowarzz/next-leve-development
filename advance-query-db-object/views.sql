-- Active: 1747462889273@@127.0.0.1@5432@ph2@public

-- creating a view
CREATE VIEW dept_avg_salary
AS
SELECT department_name, avg(salary) FROM employee GROUP BY department_name ;


-- using the view
SELECT * from dept_avg_salary;

CREATE VIEW test_view1
AS
    SELECT employee_name, salary, department_name FROM employee WHERE  department_name in (
        SELECT department_name FROM employee WHERE department_name LIKE ('%R%')
    );



SELECT * from test_view1