# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                                                                 'products' [GET]
- Show (args: product id)                                               'products/:id' [GET]
- Create (args: Product)[token required]                                'products' [POST]
- Top 5 most popular products                                           'products/top-five' [GET]
- Products by category (args: product category)                         'products/category/:id' [GET]

#### Users
- Index [token required]                                                'users' [GET]
- Show (args: id)[token required]                                       'users/:id' [GET]
- Create (args: User)[token required]                                   'users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]                 'current-orders/user/:id' [GET]
- Completed Orders by user (args: user id)[token required]              'completed-orders/user/:id' [GET]

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY
- name VARCHAR(100) NOT NULL
- price DECIMAL NOT NULL
- category_id SERIAL REFERENCES categories(id) ON DELETE CASCADE

### Category
- id SERIAL PRIMARY KEY
- name VARCHAR(100) NOT NULL

#### User
- id SERIAL PRIMARY KEY
- first_name VARCHAR(100) NOT NULL
- last_name VARCHAR(100) NOT NULL
- username VARCHAR(100) NOT NULL
- password TEXT NOT NULL

#### Order
- id SERIAL PRIMARY KEY NOT NULL
- status ENUM ('active', 'complete') NOT NULL

### OrderProduct
- id SERIAL PRIMARY KEY
- order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE
- product_id SERIAL REFERENCES products(id) ON DELETE CASCADE
- user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
- quantity INTEGER
