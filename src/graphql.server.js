const { ApolloServer } = require('apollo-server-express');

const { resolvers, typeDefs } = require('./graphql')
const sentry = require('./sentry');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => sentry.formatError(error),
});

module.exports = server;