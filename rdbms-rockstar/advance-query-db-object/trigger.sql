-- Active: 1747462889273@@127.0.0.1@5432@ph2@public
/*
A trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions. 
*/

-- Table-Level Events:
-- INSERT, UPDATE, DELETE, TRUNCATE
-- Database-Level Events
-- Database Startup, Database Shutdown, Connection start and end etc

-- CREATE TRIGGER trigger_name
-- {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
-- ON table_name
-- [FOR EACH ROW]
-- EXECUTE FUNCTION function_name();

CREATE TABLE my_users (
    user_name VARCHAR(50),
    email VARCHAR(100)
)

INSERT INTO
    my_users
VALUES ('Max', 'verstappen@gmail.com'),
    (
        'charles',
        'leclarc@gmail.com'
    )

CREATE TABLE deleted_user_audit (
    deleted_user_name VARCHAR(50),
    deletedAt TIMESTAMP
)

CREATE OR REPLACE FUNCTION save_deleted_user()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN
    INSERT INTO deleted_user_audit VALUES(OLD.user_name, now()) ;

    RAISE NOTICE 'User Audit Log Created' ;
    RETURN OLD;
END
$$

CREATE OR REPLACE Trigger save_deleted_user_trigger
 BEFORE DELETE 
 ON  my_users 
 FOR EACH ROW
EXECUTE FUNCTION save_deleted_user () ;

SELECT * FROM deleted_user_audit

DELETE FROM my_users WHERE user_name = 'Max';