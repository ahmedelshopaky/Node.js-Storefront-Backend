import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiRWxzaG9wYWt5IiwidXNlcm5hbWUiOiJhaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJDFPUjdxSFlySEtUUWZ2RTNJVFBoVC5wekxvSGc3N09xUHMxRWpjeEJLVUNSVzNwbEtVUFZhIn0sImlhdCI6MTY1Mzk1NDA1OH0.8HcvMMWHGVdTp7OpE53oIaiSIaJNaG069mmQy7QBWng';

describe('User API', () => {
  it('should return all users [token required]', async () => {
    const response: Response = await request
      .get('/users')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('should return a specific user [token required]', async () => {
    const response: Response = await request
      .get('/users/1')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('should create a user', async () => {
    const response: Response = await request
      .post('/users')
      .set('authorization', token)
      .send({
        username: 'elshopaky',
        first_name: 'Ahmed',
        last_name: 'Elshopaky',
        password: 'Ahmed?123',
      });
    expect(response.status).toBe(200);
  });

  it('should allow the user to login', async () => {
    const response: Response = await request
      .post('/users/login')
      .set('authorization', token)
      .send({
        username: 'elshopaky',
        password: 'Ahmed?123',
      });
    expect(response.status).toBe(200);
  });
});
