CREATE TYPE OrderStatus AS ENUM('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL, 
    status OrderStatus NOT NULL DEFAULT 'active'
);
