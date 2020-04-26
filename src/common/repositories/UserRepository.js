const UserModel = require("@models/User");

module.exports = {
  async getAll() {
    return await UserModel.findAll({ attributes: ['id', 'name', 'email'] });
  },
  async getById(user_id) {
    return await UserModel.findByPk(user_id);
  },
  async getUserData(user_id) {
    return UserModel.findByPk(user_id, {
      include: { all: true },
    });
  },
  async save({
    name,
    email,
    password,
  }) {
    return await UserModel.create({ name, email, password });
  },
  async userExists(email) {
    return await UserModel.findOne({ where: { email } });
  }
};
