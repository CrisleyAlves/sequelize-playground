const { check, param } = require('express-validator/');

const validations = {
  save: [
    check('name').isString().withMessage('Technology name is required'),
  ],
};

module.exports = {
  validations,
};
