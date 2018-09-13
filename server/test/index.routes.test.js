const server = require('../');
const request = require('supertest');

afterEach(async () => {
  server.close();
});

describe('routes: index', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Currency Watcher API');
  })
});

describe('routes: rates', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/rates');
    expect(response.status).toEqual(404);
  })
});

