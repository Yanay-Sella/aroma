-- some useful queries

SELECT * FROM users

-- to get users by branches
SELECT email,bname,country FROM branches,users WHERE bname=branch;


-- to get each user favorite foods (user 6 in this example)
SELECT food,userid FROM loves,users WHERE userId=id and (id=6);

-- to get all branches
SELECT * FROM branches;