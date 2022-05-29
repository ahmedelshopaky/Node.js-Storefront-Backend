CREATE TYPE ProductRate AS ENUM('POOR', 'FAIR', 'GOOD', 'VGOOD');

CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    price DECIMAL NOT NULL, 
    category_id SERIAL REFERENCES categories(id) ON DELETE CASCADE,
    rate ProductRate
);
