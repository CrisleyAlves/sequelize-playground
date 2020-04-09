const { validationResult } = require('express-validator/');
const AuthRepository = require("../repository/AuthRepository");

const { validations } = require('../validations/AuthControllerValidation');

const auth = {
  validations: validations.authenticate,
  handler: {
    authenticate: async (req, res) => {
      const { password, email } = req.body;

      const schemaErrors = validationResult(req);
      if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors.array());
      }

      const token = await AuthRepository.authenticate(email, password);
      if (!token) return res.status(401).json({ data: { message: 'Invalid credentials' } });

      return res.status(200).json({ data: { token } });
    }
  },
}

module.exports = {
  auth,
};
