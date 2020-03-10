const TechModel = require("../models/Tech");
const UserModel = require("../models/User");

const TechRepository = require("../repository/TechRepository");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await TechRepository.getTechs(user_id);
    return res.status(200).json({ data: user.techs });
  },
  async save(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await UserModel.findByPk(user_id);
    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const [tech] = await TechModel.findOrCreate({ where: { name } });    

    await user.addTech(tech);
    res.status(200).json({ data: { message: 'Tech added successfully' } });
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await UserModel.findByPk(user_id);
    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const tech = await TechModel.findOne({ where: { name } });    

    await user.removeTech(tech);
    res.status(200).json({ data: { message: 'Tech removed successfully' } });
  }
}
