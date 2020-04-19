const { check } = require('express-validator/');

const validations = {
  save: [
    check('name').isString().withMessage('Name should not be blank'),
    check('description').isString().withMessage('Description should not be blank'),
    check('business_name').isString().withMessage('Business name should not be blank'),
    check('email').isEmail().withMessage('Email address is not valid'),
    check('password').isString().withMessage('Password should not be blank'),
  ],
};

module.exports = {
  validations,
};
