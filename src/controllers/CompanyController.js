const CompanyRepository = require("../repository/CompanyRepository");
const { generatePasswordHash } = require("../modules/shared/bcrypt");

module.exports = {
  async index(req, res) {
    const companies = await CompanyRepository.getAll();
    return res.status(200).json({ data: companies });
  },
  async save(req, res) {
    const { name, logo_url, description, business_name, email, password } = req.body;

    const passwordHash = await generatePasswordHash(password);

    const company = await CompanyRepository.save({
      name, logo_url, description, business_name, email, password: passwordHash
    });

    return res.status(200).json({ data: { company } });
  }
}
