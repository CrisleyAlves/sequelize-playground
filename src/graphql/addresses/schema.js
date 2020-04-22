const typeDefs = `
  type Address {
    id: Int
    zipcode: String
    street: String
    number: Int
  }

  input AddressInput {
    zipcode: String!
    street: String!
    number: Int!
  }
`

const addressTypeDefsQueries = `
  getUserAddresses(user_id: ID!): User
`;

const addressTypeDefsMutations = `
  createAddress(user_id: ID!, address: AddressInput!): Address
  deleteAddress(user_id: ID!, address_id: ID!): Boolean
`

module.exports = {
  Address: typeDefs,
  addressTypeDefsQueries,
  addressTypeDefsMutations
};

