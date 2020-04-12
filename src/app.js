const express = require("express");
const routes = require("./routes");
const Sentry = require('@sentry/node');

// @TODO
// Create .env file and get project configuration from there
const { dsn } = require('./sentry');

if (process.env.NODE_ENV !== 'test') {
  Sentry.init({
    environment: 'development',
    dsn,
  });
}

require('./database');

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
