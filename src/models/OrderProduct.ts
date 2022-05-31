import client from '../database';

export type OrderProductType = {
  id?: number;
  // order_id: number;
  products_id: number[];
  user_id: number;
  quantity?: number;
};

export class OrderProduct {
  create = async (
    orderProduct: OrderProductType,
    order_id: number
  ): Promise<OrderProductType[]> => {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, user_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *';

      const result: OrderProductType[] = [];
      orderProduct.products_id.forEach(async (product_id) => {
        const product = await conn.query(sql, [
          order_id,
          product_id,
          orderProduct.user_id,
          orderProduct.quantity,
        ]);
        result.push(product as unknown as OrderProductType);
      });
      conn.release();
      return result;
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
