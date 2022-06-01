import client from '../database';
import { OrderProductType, OrderProduct } from './OrderProduct';

enum Status {
  'active',
  'complete',
}

export type OrderType = {
  id?: number;
  status: Status;
};

export class Order {
  index = async (): Promise<OrderType[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  };

  create = async (
    order: OrderType,
    orderedProducts: OrderProductType
  ): Promise<OrderType[]> => {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (status) VALUES ($1) RETURNING *';
      const result = await conn.query(sql, [order.status || 'active']);
      conn.release();
      // create order product // TODO: what if product is not found?
      await new OrderProduct().create(orderedProducts, result.rows[0].id);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
    }
  };

  getCurrentOrders = async (user_id: number): Promise<OrderType[]> => {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT orders.id, status, user_id FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1) AND status='active'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get current orders: ${err}`);
    }
  };

  getCompletedOrders = async (user_id: number): Promise<OrderType[]> => {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT orders.id, status, user_id FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1) AND status='complete'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get completed orders: ${err}`);
    }
  };
}
