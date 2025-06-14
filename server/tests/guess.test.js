const request = require('supertest');
const app = require('../index');

describe('POST /api/guess', () => {
  it('should return true for correct guess', async () => {
    const wordRes = await request(app).get('/api/word');
    const { id } = wordRes.body;

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

  it('should return 400 if session ID is missing', async () => {
  const res = await request(app)
    .post('/api/guess')
    .send({ guess: 'planet' });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty('error', 'Invalid session ID');
  });

  it('should return 400 for invalid session ID', async () => {
  const res = await request(app)
    .post('/api/guess')
    .send({ id: 'nonexistent-id', guess: 'planet' });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty('error', 'Invalid session ID');
  });

  it('should handle missing guess field', async () => {
  const wordRes = await request(app).get('/api/word');
  const { id } = wordRes.body;

  const res = await request(app)
    .post('/api/guess')
    .send({ id });

  
  expect(res.statusCode).toBe(400); 
  });

  it('should return true for correct guess with different casing', async () => {
  const wordRes = await request(app).get('/api/word');
  const { id } = wordRes.body;
  const original = require('../Utils/wordBank').sessions[id];

  const res = await request(app)
    .post('/api/guess')
    .send({ id, guess: original.toUpperCase() });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('correct', true);
  });

it('should not allow reusing session after correct guess (if enforced)', async () => {
  const wordRes = await request(app).get('/api/word');
  const { id } = wordRes.body;
  const original = require('../Utils/wordBank').sessions[id];

  await request(app)
    .post('/api/guess')
    .send({ id, guess: original });

  const res = await request(app)
    .post('/api/guess')
    .send({ id, guess: original });

  expect(res.statusCode).toBe(400);
  });
});