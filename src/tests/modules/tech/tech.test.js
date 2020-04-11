const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../app');

const { addTechSuccess, removeTechSuccess, userDoesNotExist } = require('../../../modules/shared/messages');

const { FIRST_USER_ID, INVALID_USER_ID } = require('./../shared/data');
const { tech } = require('./data');

describe('Tech module - Positive Flow', () => {
  it('should add a tech to a user', async () => {
    const response = await request(app)
      .post(`/api/users/${FIRST_USER_ID}/techs/`)
      .send(tech)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.message).to.equal(addTechSuccess);
  });

  it('shouldg return user\'s tech list', async () => {
    const response = await request(app)
      .get(`/api/users/${FIRST_USER_ID}/techs/`)
      .expect('Content-Type', /json/)
      .expect(200);

    const [firstTech] = response.body.data;
    expect(firstTech.name).to.equal(tech.name);
  });

  it('shouldg remove the given tech from user\'s tech list', async () => {
    const response = await request(app)
      .delete(`/api/users/${FIRST_USER_ID}/techs/`)
      .send(tech)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.message).to.equal(removeTechSuccess);
  });

  it('should return a message that the given user id does not exist', async () => {
    const response = await request(app)
      .post(`/api/users/${INVALID_USER_ID}/techs/`)
      .send(tech)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body.message).to.equal(userDoesNotExist);
  });
});
