const request = require('supertest');
const { expect } = require('chai');

const app = require('../../../app');

const { company } = require('./data');

describe('Company module', () => {
  it('should create a company and return the created object', async () => {
    const response = await request(app)
      .post('/api/companies/')
      .send(company)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.company.name).to.equal(company.name);
    expect(response.body.data.company.email).to.equal(company.email);
  });

  it('should return all companies', async () => {
    const response = await request(app)
      .get('/api/companies/')
      .expect('Content-Type', /json/)
      .expect(200);

    const [firstCompany] = response.body.data;

    expect(firstCompany.business_name).to.equal(company.business_name);
    expect(firstCompany.email).to.equal(company.email);
  });
});
