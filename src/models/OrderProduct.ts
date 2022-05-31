import client from '../database';

export type OrderProductType = {
  id?: number;
  // order_id: number;
  products: [{ id: number; quantity: number }];
  user_id: number;
  quantity?: number;
};

export class OrderProduct {
  create = async (
    orderProduct: OrderProductType,
    order_id: number
  ): Promise<void> => {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, user_id, quantity) VALUES ($1, $2, $3, $4)';

      orderProduct.products.forEach(async (product) => {
        await conn.query(sql, [
          order_id,
          product.id,
          orderProduct.user_id,
          product.quantity,
        ]);
      });
      conn.release();
    } catch (err) {
      throw new Error(`Cannot create order product: ${err}`);
    }
  };

  // show = async (order_id: number): Promise<OrderProductType> => {
  //   try {
  //     const conn = await client.connect();
  //     const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
  //     const result = await conn.query(sql, [order_id]);
  //     conn.release();
  //     return result.rows[0];
  //   } catch (err) {
  //     throw new Error(`Cannot get orders: ${err}`);
  //   }
  // };
}
