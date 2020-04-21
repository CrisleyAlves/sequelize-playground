const typeDefs = `
  type User {
    name: String
    email: String
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

