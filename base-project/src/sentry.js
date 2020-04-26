const Sentry = require('@sentry/node');

const sentry = {
  init: () => {
    Sentry.init({
      environment: process.env.NODE_ENV,
      dsn: process.env.SENTRY_DNS,
    });
  },
  formatError: (error, source = 'graphql') => {
    Sentry.setTag('source', source);
    Sentry.captureException(error);
    return error;
  },
  requestHandler: () => Sentry.Handlers.requestHandler(),
  errorHandler: () => Sentry.Handlers.errorHandler(),
};

module.exports = sentry;
