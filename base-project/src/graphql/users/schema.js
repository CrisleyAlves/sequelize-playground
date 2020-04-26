const typeDefs = `
  type User {
    id: Int
    name: String
    email: String
    addresses: [Address]
    techs: [Tech]
  }

  type Tech {
    id: Int
    name: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
`

const userTypeDefsQueries = `
  getAllUsers: [User]
  getUserData(user_id: ID!): User
`;

const userTypeDefsMutations = `
  createUser(user: UserInput!): User
`

module.exports = {
  User: typeDefs,
  userTypeDefsQueries,
  userTypeDefsMutations
};

