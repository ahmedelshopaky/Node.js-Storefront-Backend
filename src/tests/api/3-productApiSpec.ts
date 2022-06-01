import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
let token = '';

beforeAll(async (): Promise<void> => {
  const response: Response = await request.post('/users/login').send({
    username: 'ahelshopaky',
    password: 'password',
  });
  token = response.body.token;
});

describe('Product API', () => {
  it('should return all products', async () => {
    const response: Response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('should return a top five rated products', async () => {
    const response: Response = await request.get('/products/top-five');
    expect(response.status).toBe(200);
  });

  it('should create a product', async () => {
    const response: Response = await request
      .post('/products')
      .set('authorization', token)
      .send({
        name: 'My Product',
        price: 1500,
        category_id: 1,
      });
    expect(response.status).toBe(200);
  });

  it('should return 401 [token required]', async () => {
    const response: Response = await request.post('/products').send({
      name: 'My Product',
      price: 1500,
      category_id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('should return a specific product', async () => {
    const response: Response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('should return a product by category', async () => {
    const response: Response = await request.get('/products/category/1');
    expect(response.status).toBe(200);
  });
});
