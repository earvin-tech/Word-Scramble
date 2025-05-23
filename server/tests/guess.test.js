const request = require('supertest');
const app = require('../index');

describe('POST /api/guess', () => {
  it('should return true for correct guess', async () => {
    const wordRes = await request(app).get('/api/word');
    const { id, scrambled } = wordRes.body;

    // Use the correct original word (look up from session manually or mock if needed)
    const correctWord = require('../Utils/wordBank').sessions[id];

    const res = await request(app)
      .post('/api/guess')
      .send({ id, guess: correctWord });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('correct', true);
  });

  it('should return false for incorrect guess', async () => {
    const wordRes = await request(app).get('/api/word');
    const { id } = wordRes.body;

    const res = await request(app)
      .post('/api/guess')
      .send({ id, guess: 'wrongword' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('correct', false);
  });
});