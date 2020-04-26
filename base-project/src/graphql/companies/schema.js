const { gql } = require('apollo-server-express')

const typeDefs = `
  type Company {
    description: String
    email: String
    business_name: String
  }

  input CompanyInput {
    name: String
    logo_url: String
    description: String
    business_name: String
    email: String
    password: String
  }
`

const companyTypeDefsQueries = `
  getAllCompanies: [Company!]
`;

const companyTypeDefsMutations = `
  createCompany(company: CompanyInput!): Company
`

module.exports = {
  Company: typeDefs,
  companyTypeDefsQueries,
  companyTypeDefsMutations
};
