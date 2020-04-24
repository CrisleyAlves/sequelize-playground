const UserRepository = require("@repositories/UserRepository");
const { generatePasswordHash } = require("@utils/bcrypt");
const { emailAlreadyInUse } = require("@utils/messages");

const { validations } = require('./UserControllerValidation');

const user = {
  validations: validations.save,
  handler: {
    async index(req, res) {
      const users = await UserRepository.getAll();
      return res.status(200).json({ data: users });
    },
    async save(req, res) {
      const { name, email, password } = req.body;

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
