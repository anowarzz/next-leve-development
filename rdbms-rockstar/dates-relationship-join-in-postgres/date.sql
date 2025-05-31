-- Active: 1747462889273@@127.0.0.1@5432@varsity

SHOW timezone;

CREATE TABLE timezone (
    ts TIMESTAMP without time zone,
    tsz TIMESTAMP with time zone
);

INSERT INTO
    timezone
VALUES (
        '2025-5-20 06:40:00',
        '2025-5-20 06:40:00'
    );

SELECT * from timeZone

-- date and time casting
SELECT now()::date;

SELECT now()::time;

-- showing current date
SELECT CURRENT_DATE

-- getting todays date in desired format
SELECT to_char(now(), 'yyyy/mm/dd')

SELECT to_char(now(), 'Month')

-- Interval /
SELECT CURRENT_DATE - INTERVAL '1 Year 3 month'

-- age calculation / time difference between dates
SELECT age (CURRENT_DATE, '1999-03-04')

-- showing age from birthdate
SELECT *, age (CURRENT_DATE, dob) from students

-- extract function to extract year, month and day from a date
SELECT extract( year from '2025-5-20'::date )