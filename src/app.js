require('module-alias/register')
require('./common/database');


// @TODO
// It seems this file is having too much responsability
// Should separete it's responsabilities properly

const express = require("express");
const Sentry = require('@sentry/node');

// @TODO
// Should move it to GraphqlQL config file
const { ApolloServer } = require('apollo-server-express');
const { resolvers, typeDefs } = require('./graphql')

// @TODO
// Should move it to rest api config file
const routes = require("./rest/routes");

// @TODO
// Move it to a separeted file
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: process.env.SENTRY_DNS,
  });
}

const app = express();

// @TODO
// Should move it to GraphqlQL config file
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    Sentry.setTag('source', 'graphql');
    Sentry.captureException(error);
    return error;
  }
});


app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(routes);
server.applyMiddleware({ app });
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
