const typeDefs = `
  type User {
    id: Int
    name: String
    email: String
    addresses: [Address]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
`

const userTypeDefsQueries = `
  getAllUsers: [User]
`;

const userTypeDefsMutations = `
  createUser(user: UserInput!): User
`

module.exports = {
  User: typeDefs,
  userTypeDefsQueries,
  userTypeDefsMutations
};

