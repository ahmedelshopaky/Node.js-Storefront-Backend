CREATE TABLE order_products (
    id SERIAL PRIMARY KEY NOT NULL, 
    order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
    product_id SERIAL REFERENCES products(id) ON DELETE CASCADE,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL -- DEFAULT 0
);
