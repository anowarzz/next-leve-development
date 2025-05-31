-- Active: 1747462889273@@127.0.0.1@5432@ph@public
SELECT * FROM students2

--  Group BY
SELECT country, count(*), avg(age) FROM students2
    GROUP BY country

-- filter groups using having to show only counties with average age above 22 
SELECT country, avg(age) FROM students2
 GROUP BY country
    HAVING avg(age) > 22

-- count students born in yeach year
SELECT extract(year from dob) as birth_year, count(*) FROM students2
    GROUP BY birth_year