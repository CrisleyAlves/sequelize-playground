const CompanyModel = require("../model/Company");

module.exports = {
  async getAll() {
    return await CompanyModel.findAll({ attributes: ['id', 'business_name', 'description', 'email'] });
  },
  async save({
    name,
    logo_url,
    description,
    business_name,
    email,
    password
  }) {
    return await CompanyModel.create({
      name, logo_url, description, business_name, email, password
     });
  },

};
