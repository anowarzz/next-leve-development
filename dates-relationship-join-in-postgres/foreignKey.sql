-- Active: 1747462889273@@127.0.0.1@5432@varsity@public
-- creating user table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL
)

-- creating post table

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user" (id) ON DELETE CASCADE
)


-- addint user id not null constraint
ALTER TABLE post
 AlTER COLUMN user_id set NOT NULL ;


--  inserting data into user table
INSERT INTO "user" (username) VALUES ('akash'), ('batash'), ('sagor'), ('nodi');

SELECT * from "user"


-- inserting data into post table
INSERT INTO post (title, user_id) VALUES ('Enjoying a sunny day with Akash! ☀️', 2),
('Batash just shared an amazing recipe! 🍲', 1),
('Exploring adventures with Sagor.🌟', 4),
('Nodi''s wisdom always leaves me inspired. 📚', 4);

SELECT * from post

SELECT * from "user"


-- Insertion constraint on INSERT post
-- Attempting to insert a post with a user ID that does not exist
-- Inserting a post with a valid user ID
-- Attempting to insert a post without specifying a user ID




-- can't insert a null user id
INSERT INTO post (title, user_id) VALUES ('test', NULL)



DROP Table "user"

DROP TABLE post

----------> DELETION <-------
--> Deletition constraint on DELETE user

-- Restrict Deletion ---> ON DELETE RESTRICT / ON DELETE NO ACTION (DEFAULT)
-- Cascading Deletion --> ON DELETE CASCADE
-- Setting NUll ---> ON DELETE SET NULL
-- Set default value  ---> ON DELETE SET DEFAULT

DELETE FROM "user"
WHERE id = 4