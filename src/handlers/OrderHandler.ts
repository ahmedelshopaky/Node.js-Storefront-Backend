import express from 'express';
import { authenticate } from './UserHandler';
import { Order, OrderType } from '../models/Order';
import { OrderProductType } from '../models/OrderProduct';

const orderInstance = new Order();
const orderRoutes = express.Router();

const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const orders = await orderInstance.index();

    // orders.forEach(async (order: OrderType) => {
    //   const orderProduct: OrderProductType = await orderProductInstatnce.show(
    //     order.id as number
    //   );
    // });

    res.json({ orders });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const order: OrderType = {
      status: req.body.status,
    };
    const orderProduct: OrderProductType = {
      products: req.body.products,
      user_id: req.body.user_id,
    };
    const ordered = await orderInstance.create(order, orderProduct);
    res.json({ order: ordered });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

const getCurrentOrders = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const orders = await orderInstance.getCurrentOrders(id);
    res.json({ orders });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

const getCompletedOrders = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const orders = await orderInstance.getCompletedOrders(id);
    res.json({ orders });
  } catch (err) {
    res.status(404).json({ respone: 'Not Found' });
  }
};

orderRoutes.get('/orders', authenticate, index);
orderRoutes.post('/orders', authenticate, create);
orderRoutes.get('/current-orders/user/:id', authenticate, getCurrentOrders);
orderRoutes.get('/completed-orders/user/:id', authenticate, getCompletedOrders);

export default orderRoutes;
