const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

describe('User module', () => {
  it('should create a user and return the object created', async () => {
    const user = {
      name: 'dummy user name',
      email: 'dummy@email.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/api/users/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.user.email).to.equal(user.email);
  });

  it('should return a message that the email sent is already in use', async () => {
    const user = {
      name: 'dummy user name',
      email: 'dummy@email.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/api/users/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);

    // @TODO
    // Create a file to store the API messages
    expect(response.body.data.message).to.equal('This email is already in use');
  });
});
