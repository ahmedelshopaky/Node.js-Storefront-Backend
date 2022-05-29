import Client from '../database';
import { OrderProductType, OrderProduct } from './OrderProduct';
import { ProductType } from './Product';

enum Status {
  'active',
  'complete',
}

export type OrderType = {
  id?: number;
  status: Status;
  products: ProductType[];
  user_id: number;
};

export class Order {
  index = async (): Promise<OrderType[]> => {
    try {
      const conn = await Client.connect();
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
    orderedProducts: OrderProductType[]
  ): Promise<OrderType[]> => {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (status) VALUES ($1)';
      const result = await conn.query(sql, [order.status]);
      conn.release();
      const storedOrder = result.rows[0];
      // create order product
      const storedOrderProducts = await new OrderProduct().create(
        orderedProducts
      );
      return { ...storedOrder, products: storedOrderProducts };
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
    }
  };

  get_current_orders = async (user_id: number): Promise<OrderType[]> => {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT orders.id, status, user_id FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1) AND status='active'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get current orders: ${err}`);
    }
  };

  get_completed_orders = async (user_id: number): Promise<OrderType[]> => {
    try {
      const conn = await Client.connect();
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
