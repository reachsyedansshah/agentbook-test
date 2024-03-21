const request = require('supertest');
const server = require('../index'); 

describe('Auth API', () => {
  
  describe('POST /register', () => {
    test('It should register a user', async () => {
      const response = await request(server)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: '123456'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });
  });

  
  describe('POST /login', () => {
    test('It should log in a user', async () => {
      const response = await request(server)
        .post('/login')
        .send({
          email: 'john@example.com',
          password: '123456'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
