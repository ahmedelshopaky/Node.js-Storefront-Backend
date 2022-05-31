import client from '../database';

enum Rate {
  'POOR',
  'FAIR',
  'GOOD',
  'VGOOD',
}

export type ProductType = {
  id?: number;
  name: string;
  price: number;
  category_id: number;
  rate?: Rate;
};

export class Product {
  index = async (): Promise<ProductType[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products: ${err}`);
    }
  };

  show = async (id: number): Promise<ProductType> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product: ${err}`);
    }
  };

  create = async (product: ProductType): Promise<ProductType[]> => {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category_id,
      ]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot create product: ${err}`);
    }
  };

  getTopFiveProducts = async (): Promise<ProductType[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products ORDER BY rate DESC LIMIT 5';
      const result = await conn.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get top five products: ${err}`);
    }
  };

  getProductByCategory = async (
    category_id: number
  ): Promise<ProductType[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE category_id=($1)';
      const result = await conn.query(sql, [category_id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get top five products: ${err}`);
    }
  };
}
