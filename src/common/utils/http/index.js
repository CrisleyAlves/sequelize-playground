const { serverError: serverErrorMessage } = require("@utils/messages");

const ok = (data) => ({
  statusCode: 200,
  data,
});

const notFound = (message) => ({
  name: 'Not Found',
  statusCode: 404,
  message,
});

const unauthorized = (message) => ({
  name: 'Unauthorized',
  statusCode: 401,
  message,
})

const serverError = () => ({
  name: 'Server Error',
  statusCode: 500,
  message: serverErrorMessage,
});

const conflict = (message) => ({
  name: 'Conflict',
  statusCode: 409,
  message,
});

module.exports = {
  ok,
  conflict,
  serverError,
  notFound,
  unauthorized,
};
