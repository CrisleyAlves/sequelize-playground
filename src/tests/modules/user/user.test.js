const request = require('supertest');
const { expect } = require('chai');
const { emailAlreadyInUse } = require('../../../modules/shared/messages');

const truncate = require("../../util");
const app = require('../../../app');

const { user } = require('./data');

describe('User module', () => {
  before(async () => await truncate());

  it('should create a user and return the object created', async () => {
    const response = await request(app)
      .post('/api/users/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.user.name).to.equal(user.name);
    expect(response.body.data.user.email).to.equal(user.email);
  });

  it('should return all users', async () => {
    const response = await request(app)
      .get('/api/users/')
      .expect('Content-Type', /json/)
      .expect(200);

    const [firstUser] = response.body.data;

    expect(firstUser.name).to.equal(user.name);
    expect(firstUser.email).to.equal(user.email);
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

    expect(response.body.data.message).to.equal(emailAlreadyInUse);
  });
});
