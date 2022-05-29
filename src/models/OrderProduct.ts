import Client from '../database';

export type OrderProductType = {
  id?: number;
  order_id: number;
  product_id: number;
  user_id: number;
  quantity?: number;
};

export class OrderProduct {
  create = async (
    orderProducts: OrderProductType[]
  ): Promise<OrderProductType[]> => {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, user_id, quantity) VALUES ($1, $2, $3, $4)';
      const result: OrderProductType[] = [];
      for (const orderProduct of orderProducts) {
        const product = await conn.query(sql, [
          orderProduct.order_id,
          orderProduct.product_id,
          orderProduct.user_id,
          (orderProduct.quantity = 1),
        ]);
        result.push(product as unknown as OrderProductType);
      }
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`Cannot create order product: ${err}`);
    }
  };
}
