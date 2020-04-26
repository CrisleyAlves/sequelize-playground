const { validationResult } = require('express-validator/');

const checkRequestData = (req, res, next) => {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(403).send(schemaErrors);
  }
  next();
}

module.exports = { checkRequestData };
