const { check } = require('express-validator/');

const validations = {
  save: [
    check('zipcode').isLength({ min: 5, max: 5 }).withMessage('Zip code should be sent as 99999'),
    check('street').isString().withMessage('Street should not be blank'),
    check('number').isNumeric().withMessage('Address number should be a number'),
  ],
};

module.exports = {
  validations,
};
