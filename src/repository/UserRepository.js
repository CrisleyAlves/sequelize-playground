const UserModel = require("../models/User");

module.exports = {
  async getAll() {
    return await UserModel.findAll();
  },
  async save(name, email) {
    return await UserModel.create({ name, email });
  }
};
