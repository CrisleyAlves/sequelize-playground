const { gql } = require('apollo-server-express')

const typeDefs = gql`
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

  type Query {
    getAllCompanies: [Company!]
  }

  type Mutation {
    createCompany(company: CompanyInput!): Company
  }
`

module.exports = { Company: typeDefs };
