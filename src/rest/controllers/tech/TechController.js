const { validationResult } = require('express-validator/');

const TechModel = require("@models/Tech");

const UserRepository = require("@repositories/UserRepository");
const TechRepository = require("@repositories/TechRepository");

const {
  serverError,
  userDoesNotExist,
  addTechSuccess,
  removeTechSuccess,
} = require("@utils/messages");

const { validations } = require('./TechControllerValidation');

const tech = {
  validations: validations.save,
  handler: {
    async index(req, res) {
      const { user_id } = req.params;

      try {
        const user = await UserRepository.getById(user_id);
        if (!user) {
          return res.status(404).json({ message: userDoesNotExist });
        }

        const updateUser = await TechRepository.getTechs(user_id);

        return res.status(200).json({ data: updateUser.techs });
      } catch (error) {
        return res.status(500).json({ message: serverError, error });
      }
    },
    async save(req, res) {
      const { user_id } = req.params;
      const { name } = req.body;

      const schemaErrors = validationResult(req);
      if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors);
      }

      try {
        const user = await UserRepository.getById(user_id);
        if (!user) {
          return res.status(404).json({ message: userDoesNotExist });
        }

        const [tech] = await TechModel.findOrCreate({ where: { name } });

        await user.addTech(tech);
        res.status(200).json({ data: { message: addTechSuccess } });
      } catch (error) {
        return res.status(500).json({ message: serverError, error });
      }
    },

    async delete(req, res) {
      const { user_id } = req.params;
      const { name } = req.body;

      try {
        const user = await UserRepository.getById(user_id);
        if (!user) {
          return res.status(404).json({ message: userDoesNotExist });
        }

        const tech = await TechModel.findOne({ where: { name } });

        await user.removeTech(tech);
        res.status(200).json({ data: { message: removeTechSuccess } });
      } catch (error) {
        return res.status(500).json({ message: serverError, error });
      }
    }
  }
}

module.exports = {
  tech
};
