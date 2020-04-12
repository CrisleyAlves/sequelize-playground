const { validationResult } = require('express-validator/');

const { generatePasswordHash } = require("../../shared/bcrypt");
const { serverError } = require("../../shared/messages");
const { validations } = require('../validations/CompanyControllerValidation');

const CompanyRepository = require("../repository/CompanyRepository");

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
