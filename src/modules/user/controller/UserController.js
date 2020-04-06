const UserRepository = require("../repository/UserRepository");
const { generatePasswordHash } = require("../../shared/bcrypt");
const { emailAlreadyInUse } = require("../../shared/messages");

module.exports = {
  async index(req, res) {
    const users = await UserRepository.getAll();
    return res.status(200).json({ data: users });
  },
  async save(req, res) {
    const { name, email, password } = req.body;

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
  },
}
