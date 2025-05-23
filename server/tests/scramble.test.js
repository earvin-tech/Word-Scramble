const request = require('supertest');
const app = require('../index');

describe('GET /api/word', () => {
  it('should return a scrambled word', async () => {
    const res = await request(app).get('/api/word');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('scrambled');
    expect(typeof res.body.scrambled).toBe('string');
    expect(res.body.scrambled.length).toBeGreaterThan(1);
  });

  it('should always return a valid scrambled word', async () => {
    for (let i = 0; i < 100; i++) {
      const res = await request(app).get('/api/word');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('scrambled');
      expect(typeof res.body.scrambled).toBe('string');
      expect(res.body.scrambled.length).toBeGreaterThan(1);
    }
  });
});
