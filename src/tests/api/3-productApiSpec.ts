import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiRWxzaG9wYWt5IiwidXNlcm5hbWUiOiJhaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJDFPUjdxSFlySEtUUWZ2RTNJVFBoVC5wekxvSGc3N09xUHMxRWpjeEJLVUNSVzNwbEtVUFZhIn0sImlhdCI6MTY1Mzk1NDA1OH0.8HcvMMWHGVdTp7OpE53oIaiSIaJNaG069mmQy7QBWng';

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

  it('should return a specific product', async () => {
    const response: Response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('should return a product by category', async () => {
    const response: Response = await request.get('/products/category/1');
    expect(response.status).toBe(200);
  });
});
