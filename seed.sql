CREATE TABLE posts (
id SERIAL PRIMARY KEY,
username VARCHAR(225),
title VARCHAR(225),
content TEXT
);

INSERT INTO posts (username, title, content) VALUES
('Bingus','This is the first post','meow');

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    username VARCHAR(225),
    comment VARCHAR(225),
    post_id INTEGER
)

INSERT INTO comments (username, comment, post_id) VALUES
('Bob','This is a comment on the first post', 1)

ALTER TABLE posts
ADD category VARCHAR(225);

ALTER TABLE posts
ADD time_posts TIME;

ALTER TABLE posts
ADD date_posts DATE;

ALTER TABLE comments
ADD time_comments TIME;

ALTER TABLE comments
ADD date_comments DATE;



