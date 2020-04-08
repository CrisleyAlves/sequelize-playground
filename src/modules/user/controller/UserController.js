const { check, validationResult } = require('express-validator/');

const UserRepository = require("../repository/UserRepository");
const { generatePasswordHash } = require("../../shared/bcrypt");
const { emailAlreadyInUse } = require("../../shared/messages");

const user = {
  validations: [
    check('name').isString().withMessage("Name should not be empty"),
    check('email').isEmail().withMessage('Email address is not valid'),
    check('password').isString().withMessage('Password is not valid'),
  ],
  handler: {
    async index(req, res) {
      const users = await UserRepository.getAll();
      return res.status(200).json({ data: users });
    },
    async save(req, res) {
      const { name, email, password } = req.body;

      const schemaErrors = validationResult(req);
      if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors);
      }

      try {
        const user = await UserRepository.userExists(email);

        if (user) {
          return res.status(409).json({ data: { message: emailAlreadyInUse } });
        }

        const passwordHash = await generatePasswordHash(password);
        const createdUser = await UserRepository.save({
          name,
          email,
          password: passwordHash,
        });

        return res.status(200).json({ data: { user: createdUser } });
      } catch (error) {
        return res.status(500).json({ error });
      }
    },
  }
}

module.exports = {
  user,
}
