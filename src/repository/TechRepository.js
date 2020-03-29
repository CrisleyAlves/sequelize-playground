const UserModel = require("../modules/user/model/User");

module.exports = {
  async getTechs(user_id) {
    return await UserModel.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['name'],
        through: {
          attributes: [],
        }}
    });
  },
};
