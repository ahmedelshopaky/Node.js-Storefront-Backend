import supertest, { Response, Test } from 'supertest';
import app from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiRWxzaG9wYWt5IiwidXNlcm5hbWUiOiJhaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJDFPUjdxSFlySEtUUWZ2RTNJVFBoVC5wekxvSGc3N09xUHMxRWpjeEJLVUNSVzNwbEtVUFZhIn0sImlhdCI6MTY1Mzk1NDA1OH0.8HcvMMWHGVdTp7OpE53oIaiSIaJNaG069mmQy7QBWng';

describe('Category API', () => {
  it('should create a category', async () => {
    const response: Response = await request
      .post('/categories')
      .set('authorization', token)
      .send({
        name: 'My Category',
      });
    expect(response.status).toBe(200);
  });
});
