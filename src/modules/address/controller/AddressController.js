const UserModel = require("../../user/model/User");
const AddressRepository = require("../repository/AddressRepository");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await AddressRepository.getAddresses(user_id);
    return res.status(200).json({ data: user });
  },
  async save(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const address = await AddressRepository.save({
      zipcode,
      street,
      number,
      user_id,
    });

    return res.status(200).json({ data: address });
  }
};
