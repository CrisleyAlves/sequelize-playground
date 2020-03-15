const UserModel = require("../models/User");

module.exports = {
  async getAll() {
    return await UserModel.findAll({ attributes: ['id', 'name', 'email'] });
  },
  async save({
    name,
    email,
    password,
  }) {
    return await UserModel.create({ name, email, password });
  },
  async userExists(email){
    return await UserModel.findOne({ where: { email } });
  }
};
