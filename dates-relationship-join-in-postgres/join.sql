-- Active: 1747462889273@@127.0.0.1@5432@varsity@public


CREATE Table "user"(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL
)

CREATE Table post(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user"(id)
)



INSERT INTO "user" (username) VALUES
('akash'),
('batash'),
('sagor'),
('nodi');

INSERT INTO post (title, user_id) VALUES
('Enjoying a sunny day with Akash! ☀️', 2),
('Batash just shared an amazing recipe! 🍲', 1),
('Exploring adventures with Sagor.🌟', 4),
('Nodi''s wisdom always leaves me inspired. 📚', 4);


DROP Table post;
DROP Table "user";

SELECT * from "user";
SELECT * from post;


-- Joining user table and post table with table name alias // INNER JOIN
SELECT title, username FROM post
INNER JOIN "user" on post.user_id = "user".id


-- Joining user table and post table with table name alias // INNER JOIN
SELECT * FROM post as p
INNER JOIN "user" as u on p.user_id = u.id


------> Left and Right Join <-----
