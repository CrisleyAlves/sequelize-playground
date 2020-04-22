const { gql } = require('apollo-server-express')

const { Company, companyTypeDefsMutations, companyTypeDefsQueries } = require('./companies/schema')
const { companyMutations, companyQueries } = require('./companies/resolvers')

const { User, userTypeDefsMutations, userTypeDefsQueries } = require('./users/schema')
const { userMutations, userQueries } = require('./users/resolvers')

const { Address, addressTypeDefsMutations, addressTypeDefsQueries } = require('./addresses/schema')
const { addressMutations, addressQueries } = require('./addresses/resolvers')

const { Auth, authTypeDefsMutations } = require('./authentication/schema')
const { authenticationMutations } = require('./authentication/resolvers')

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
    ...authenticationMutations
  }
};

const typeDefs = gql`
  ${Company}
  ${User}
  ${Address}
  ${Auth}

  type Query {
    ${companyTypeDefsQueries}
    ${userTypeDefsQueries}
    ${addressTypeDefsQueries}
  }

  type Mutation {
    ${companyTypeDefsMutations}
    ${userTypeDefsMutations}
    ${addressTypeDefsMutations}
    ${authTypeDefsMutations}
  }
`

module.exports = { resolvers, typeDefs };