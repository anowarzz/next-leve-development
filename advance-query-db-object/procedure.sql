
-- creating a procedure
CREATE OR REPLACE Procedure remove_emp_by_id(p_emp_id INT)
LANGUAGE plpgsql
AS
$$
DECLARE
test_var INT;
BEGIN
SELECT employee_id INTO test_var FROM employee WHERE employee_id = p_emp_id ;
DELETE FROM employee WHERE employee_id = test_var;

RAISE NOTICE 'Employee Removed Successfully';

END
$$;

call remove_emp_by_id(25);

SELECT * FROM employee