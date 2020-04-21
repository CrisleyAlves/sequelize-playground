const { gql } = require('apollo-server-express')

const { Company, companyTypeDefsMutations, companyTypeDefsQueries } = require('./companies/schema')
const { companyMutations, companyQueries } = require('./companies/resolvers')

const resolvers = {
  Query: {
    ...companyQueries,
  },
  Mutation: {
    ...companyMutations,
  }
};

const typeDefs = gql`
  ${Company}

  type Query {
    ${companyTypeDefsQueries}
  }

  type Mutation {
    ${companyTypeDefsMutations}
  }
`

module.exports = { resolvers, typeDefs };