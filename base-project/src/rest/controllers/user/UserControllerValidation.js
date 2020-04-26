const { check } = require('express-validator/');

const validations = {
  save: [
    check('name').isString().withMessage("Name should not be empty"),
    check('email').isEmail().withMessage('Email address is not valid'),
    check('password').isString().withMessage('Password is not valid'),
  ],
};

module.exports = {
  validations,
};
