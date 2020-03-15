const { check, validationResult } = require('express-validator/check');
const AuthRepository = require("../repository/AuthRepository");

// @TODO
// Maybe move this validation to a module

const login = {
  validations: [
    check('email').isEmail().withMessage('invalid email sent'),
    check('password').isString(),
  ],
  handler: async(req, res) => {
    const { password, email } = req.body;

    const schemaErrors = validationResult(req);
		if (!schemaErrors.isEmpty()) {
			return res.status(403).send(schemaErrors.array());
		}

    const token = await AuthRepository.authenticate(email, password);
    if(!token) return res.status(401).json({ data: { message: 'Invalid credentials' } });

    return res.status(200).json({ data: { token } });
  }
}

module.exports = {
  login,
};
