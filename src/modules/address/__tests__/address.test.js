const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

const FIRST_USER_ID = 1;

describe('Address module', () => {
  it('should add an address to a user', async () => {
    const address = {
      zipcode: '12345',
      street: 'some street',
      number: 13,
    };

    const response = await request(app)
      .post(`/api/users/${FIRST_USER_ID}/addresses`)
      .send(address)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.zipcode).to.equal(address.zipcode);
    expect(response.body.data.street).to.equal(address.street);
    expect(response.body.data.number).to.equal(address.number);
  });
});
