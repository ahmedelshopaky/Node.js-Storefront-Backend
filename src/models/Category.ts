import client from '../database';

export type CategoryType = {
  id?: number;
  name: string;
};

export class Category {
  async create(category: CategoryType): Promise<CategoryType[]> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
      const result = await conn.query(sql, [category.name]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create category: ${err}`);
    }
  }
}
