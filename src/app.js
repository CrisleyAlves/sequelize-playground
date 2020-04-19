require('module-alias/register')
require('./common/database');

const express = require("express");
const Sentry = require('@sentry/node');
const routes = require("./rest/routes");

if (process.env.NODE_ENV === 'production') {
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
