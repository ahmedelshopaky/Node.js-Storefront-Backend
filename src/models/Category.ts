import Client from '../database';

export type CategoryType = {
  id?: number;
  name: string;
};

export class Category {
  async create(category: CategoryType): Promise<CategoryType[]> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO categories (name) VALUES ($1)';
      const result = await conn.query(sql, [category.name]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot create category: ${err}`);
    }
  }
}
