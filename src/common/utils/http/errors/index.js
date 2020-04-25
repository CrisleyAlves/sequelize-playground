class ErrorHandler extends Error {
  constructor(name, statusCode, message, error = {}) {
    super();
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.stack = error.stack || null;
  }
}

module.exports = ErrorHandler;
