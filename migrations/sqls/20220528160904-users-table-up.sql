CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL, 
    first_name VARCHAR(100) NOT NULL, 
    last_name VARCHAR(100) NOT NULL, 
    username VARCHAR(100) NOT NULL, 
    password TEXT NOT NULL
);
