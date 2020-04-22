const { gql } = require('apollo-server-express')

const { Company, companyTypeDefsMutations, companyTypeDefsQueries } = require('./companies/schema')
const { companyMutations, companyQueries } = require('./companies/resolvers')

const { User, userTypeDefsMutations, userTypeDefsQueries } = require('./users/schema')
const { userMutations, userQueries } = require('./users/resolvers')

const { Address, addressTypeDefsMutations, addressTypeDefsQueries } = require('./addresses/schema')
const { addressMutations, addressQueries } = require('./addresses/resolvers')

const resolvers = {
  Query: {
    ...companyQueries,
    ...userQueries,
    ...addressQueries,
  },
  Mutation: {
    ...companyMutations,
    ...userMutations,
    ...addressMutations,
  }
};

const typeDefs = gql`
  ${Company}
  ${User}
  ${Address}

  type Query {
    ${companyTypeDefsQueries}
    ${userTypeDefsQueries}
    ${addressTypeDefsQueries}
  }

  type Mutation {
    ${companyTypeDefsMutations}
    ${userTypeDefsMutations}
    ${addressTypeDefsMutations}
  }
`

module.exports = { resolvers, typeDefs };