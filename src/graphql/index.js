const { gql } = require('apollo-server-express')

const { Company, companyTypeDefsMutations, companyTypeDefsQueries } = require('./companies/schema')
const { companyMutations, companyQueries } = require('./companies/resolvers')

const { User, userTypeDefsMutations, userTypeDefsQueries } = require('./users/schema')
const { userMutations, userQueries } = require('./users/resolvers')

const resolvers = {
  Query: {
    ...companyQueries,
    ...userQueries,
  },
  Mutation: {
    ...companyMutations,
    ...userMutations,
  }
};

const typeDefs = gql`
  ${Company}
  ${User}

  type Query {
    ${companyTypeDefsQueries}
    ${userTypeDefsQueries}
  }

  type Mutation {
    ${companyTypeDefsMutations}
    ${userTypeDefsMutations}
  }
`

module.exports = { resolvers, typeDefs };