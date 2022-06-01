import { Order } from '../../models/Order';

const order = new Order();

describe('Order', () => {
  it('order.index should be defined', () => {
    expect(order.index).toBeDefined();
  });

  it('order.create should be defined', () => {
    expect(order.create).toBeDefined();
  });

  it('order.getCurrentOrders should be defined', () => {
    expect(order.getCurrentOrders).toBeDefined();
  });

  it('order.getCompletedOrders should be defined', () => {
    expect(order.getCompletedOrders).toBeDefined();
  });
});
