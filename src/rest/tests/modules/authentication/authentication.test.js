const request = require('supertest');
const { expect } = require('chai');

const app = require('../../../../app');

const { invalidCredentials } = require('../../../../common/utils/messages');
const { user } = require('../user/data');

describe('Authentication module', () => {
  it('should authenticate user and return user\'s token', async () => {
    const { email, password } = user;

    const response = await request(app)
      .post('/api/auth/login/')
      .send({ email, password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data).to.have.ownProperty('token');
  });

  it('should not authenticate user and send invalid credentials error message', async () => {
    const response = await request(app)
      .post('/api/auth/login/')
      .send({ email: 'doesntExist@gmail.com', password: 'whatever' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body.data.message).to.equal(invalidCredentials);
  });
});
