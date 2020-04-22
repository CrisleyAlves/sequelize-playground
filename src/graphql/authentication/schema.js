const typeDefs = `
  type Auth {
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }
`

const authTypeDefsMutations = `
  authenticate(auth: AuthInput!): Auth!
`

module.exports = {
  Auth: typeDefs,
  authTypeDefsMutations
};

