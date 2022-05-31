import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);

describe('User API', () => {
  it('should return all users [token required]', async () => {
    const response: Response = await request.get('/users');
    // .set('authorization', token);
    expect(response.status).toBe(401);
  });

  it('should return a specific user [token required]', async () => {
    const response: Response = await request.get('/users/1');
    // .set('authorization', token);
    expect(response.status).toBe(401);
  });

  it('should create a user', async () => {
    const response: Response = await request.post('/users').send({
      username: 'elshopaky',
      first_name: 'Ahmed',
      last_name: 'Elshopaky',
      password: 'Ahmed?123',
    });
    expect(response.status).toBe(200);
  });

  it('should allow the user to login', async () => {
    const response: Response = await request.post('/users/login').send({
      username: 'elshopaky',
      password: 'Ahmed?123',
    });
    expect(response.status).toBe(200);
  });
});
