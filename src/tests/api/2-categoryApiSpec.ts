import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);

describe('Category API', () => {
  it('should create a category [token required]', async () => {
    const response: Response = await request.post('/categories').send({
      name: 'My Category',
    });
    expect(response.status).toBe(401);
  });
});
