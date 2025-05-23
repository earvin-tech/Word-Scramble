const request = require('supertest');
const app = require('../index');

describe('API test', () => {
  it('GET /api/test should return 200 with a message', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
