CREATE TABLE posts (
id SERIAL PRIMARY KEY,
username VARCHAR(225),
title VARCHAR(225),
content TEXT
);

INSERT INTO posts (username, title, content) VALUES
('Bingus','This is the first post','meow');

ALTER TABLE posts
ADD usernameComment VARCHAR(255);

ALTER TABLE posts
ADD comment VARCHAR(255);