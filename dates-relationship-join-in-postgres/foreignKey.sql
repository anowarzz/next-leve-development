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
    user_id INTEGER REFERENCES "user" (id)
)