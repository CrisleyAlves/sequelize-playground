const UserModel = require("../models/User");
const UserRepository = require("../repository/UserRepository");

module.exports = {
  async index(req, res) {
    const users = await UserRepository.getAll();
    return res.status(200).json({ data: users });
  },
  async save(req, res) {
    const { name, email } = req.body;
    const user = await UserRepository.getAll(name, email);
    return res.status(200).json(user); 
  }
}
