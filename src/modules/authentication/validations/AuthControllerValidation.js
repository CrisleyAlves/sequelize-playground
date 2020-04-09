const { check } = require('express-validator/');

const validations = {
  authenticate: [
    check('email').isEmail().withMessage('invalid email sent'),
    check('password').isString(),
  ],
};

module.exports = {
  validations,
};
