const { validationResult } = require('express-validator/');

const { generatePasswordHash } = require("@utils/bcrypt");
const { serverError } = require("@utils/messages");
const { validations } = require('./CompanyControllerValidation');

const CompanyRepository = require("@repositories/CompanyRepository");

const company = {
  validations: validations.save,
  handler: {
    async index(req, res) {
      try {
        const companies = await CompanyRepository.getAll();
        return res.status(200).json({ data: companies });
      } catch (error) {
        res.status(500).json({ message: serverError, error });
      }
    },
    async save(req, res) {
      const { name, logo_url, description, business_name, email, password } = req.body;

      const schemaErrors = validationResult(req);
      if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors);
      }

      try {
        const passwordHash = await generatePasswordHash(password);

        const company = await CompanyRepository.save({
          name, logo_url, description, business_name, email, password: passwordHash
        });

        return res.status(200).json({ data: { company } });
      } catch (error) {
        res.status(500).json({ message: serverError, error });
      }
    }
  }
}

module.exports = {
  company,
};
