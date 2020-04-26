const { serverError: serverErrorMessage } = require("@utils/messages");

const ErrorHandler = require('./errors');

const ok = (data) => ({
  statusCode: 200,
  data,
});

const notFound = (message = '') => {
  const name = 'Not Found';
  const statusCode = 404;

  return new ErrorHandler(name, statusCode, message);
}

const unauthorized = (message = '') => {
  const name = 'Unauthorized';
  const statusCode = 401;

  return new ErrorHandler(name, statusCode, message)
}

const serverError = (error) => {
  const name = 'Server Error';
  const statusCode = 500;
  const message = serverErrorMessage;

  return new ErrorHandler(name, statusCode, message, error)
}

const conflict = (message) => {
  const name = 'Conflict';
  const statusCode = 409;

  return new ErrorHandler(name, statusCode, message)
}

module.exports = {
  ok,
  conflict,
  serverError,
  notFound,
  unauthorized,
};
