require('module-alias/register')

const express = require("express");
const routes = require("./routes");
const Sentry = require('@sentry/node');

require('./database');

if (process.env.NODE_ENV !== 'test') {
  Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: process.env.SENTRY_DNS,
  });
}

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
