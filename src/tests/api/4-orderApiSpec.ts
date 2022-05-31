import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);

describe('Order API', () => {
  it('should return all orders [token required]', async () => {
    const response: Response = await request.get('/orders');
    // .set('authorization', token);
    expect(response.status).toBe(401);
  });

  it('should return current orders for a specific user [token required]', async () => {
    const response: Response = await request.get('/current-orders/user/1');
    // .set('authorization', token);
    expect(response.status).toBe(401);
  });

  it('should return completed orders for a specific user [token required]', async () => {
    const response: Response = await request.get('/completed-orders/user/1');
    // .set('authorization', token);
    expect(response.status).toBe(401);
  });

  it('should create an order [token required]', async () => {
    const response: Response = await request
      .post('/orders')
      // .set('authorization', token)
      .send({
        status: 'active',
        products: [
          {
            id: 1,
            quantity: 1,
          },
        ],
        user_id: 1,
      });
    expect(response.status).toBe(401);
  });
});
