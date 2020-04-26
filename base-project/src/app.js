require('module-alias/register')
require('./common/database');

const express = require("express");

const sentry = require('./sentry');
const graphqlServer = require('./graphql.server');
const restRoutes = require("./rest/routes");

if (process.env.NODE_ENV === 'production') {
  sentry.init();
}

const app = express();

app.use(sentry.requestHandler());
app.use(express.json());
app.use(restRoutes);

graphqlServer.applyMiddleware({ app });

app.use(sentry.errorHandler());

module.exports = app;
