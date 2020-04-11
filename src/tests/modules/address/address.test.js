const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

const { removeAddressSuccess, removeAddressError, serverError } = require('../../../modules/shared/messages');

const {
  FIRST_ADDRESS_ID,
  FIRST_USER_ID,
  INVALID_ADDRESS_ID,
  INVALID_USER_ID,
  NULL_ADDRESS_ID,
  NULL_USER_ID,
} = require('../shared/data');

const { address } = require('./data');

describe('Address module', () => {
  it('should add an address to a user', async () => {
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

  it('should remove the given user\'s address', async () => {
    const response = await request(app)
      .delete(`/api/users/${FIRST_USER_ID}/addresses/${FIRST_ADDRESS_ID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.message).to.equal(removeAddressSuccess);
  });

  it('should return a message that the given address does not exist', async () => {
    const response = await request(app)
      .delete(`/api/users/${INVALID_USER_ID}/addresses/${INVALID_ADDRESS_ID}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body.data.message).to.equal(removeAddressError);
  });

  it('should return server error mesage', async () => {
    const response = await request(app)
      .delete(`/api/users/${NULL_USER_ID}/addresses/${NULL_ADDRESS_ID}`)
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body.message).to.equal(serverError);
  });
});
