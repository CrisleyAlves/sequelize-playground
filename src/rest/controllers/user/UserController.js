const { generatePasswordHash } = require("@utils/bcrypt");
const { emailAlreadyInUse } = require("@utils/messages");
const { ok, conflict, serverError } = require("@utils/http");

const UserRepository = require("@repositories/UserRepository");

const { validations } = require('./UserControllerValidation');

const user = {
  validations: validations.save,
  handler: {
    async index(req, res) {
      try {
        const users = await UserRepository.getAll();
        return res.status(200).json(ok(users));
      } catch (error) {
        return res.status(500).json(serverError());
      }
    },
    async save(req, res) {
      const { name, email, password } = req.body;

      try {
        const user = await UserRepository.userExists(email);

        if (user) {
          return res.status(409).json(conflict(emailAlreadyInUse));
        }

        const passwordHash = await generatePasswordHash(password);
        const createdUser = await UserRepository.save({
          name,
          email,
          password: passwordHash,
        });

        return res.status(200).json(ok(createdUser));
      } catch (error) {
        return res.status(500).json(serverError(error));
      }
    },
  }
}

module.exports = {
  user,
}
