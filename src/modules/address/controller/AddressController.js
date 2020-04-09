const { check, validationResult } = require('express-validator/');

const UserModel = require("../../user/model/User");
const AddressRepository = require("../repository/AddressRepository");
const {
  userDoesNotExist,
  removeAddressSuccess,
  removeAddressError,
  serverError,
} = require("../../shared/messages");

// @TODO
// Move the validation to another file to avoid code pollution
const address = {
  validations: [
    check('zipcode').isLength({ min: 5, max: 5 }).withMessage('Zip code should be sent as 99999'),
    check('street').isString().withMessage('Street should not be blank'),
    check('number').isNumeric().withMessage('Number should be a number'),
  ],
  handler: {
    async index(req, res) {
      const { user_id } = req.params;
      const user = await AddressRepository.getAddresses(user_id);
      return res.status(200).json({ data: user });
    },
    async save(req, res) {
      const { user_id } = req.params;
      const { zipcode, street, number } = req.body;

      const schemaErrors = validationResult(req);
      if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors);
      }

      const user = await UserModel.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: userDoesNotExist });
      }

      const address = await AddressRepository.save({
        zipcode,
        street,
        number,
        user_id,
      });

      return res.status(200).json({ data: address });
    },
    async delete(req, res) {
      const { user_id, address_id } = req.params;

      try {
        const isAddressRemoved = await AddressRepository.delete({ user_id, address_id });

        if (!isAddressRemoved) {
          res.status(404).json({ data: { message: removeAddressError } });
          return;
        }

        res.status(200).json({ data: { message: removeAddressSuccess } });
      } catch (error) {
        res.status(500).json({ message: serverError, error });
      }
    }
  }
};

module.exports = {
  address,
};
