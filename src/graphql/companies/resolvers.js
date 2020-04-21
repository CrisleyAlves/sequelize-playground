const CompanyRepository = require("@repositories/CompanyRepository");
const { generatePasswordHash } = require("@utils/bcrypt");

const companyQueries = {
  async getAllCompanies() {
    try {
      const companies = await CompanyRepository.getAll();
      return companies;
    } catch (error) {
      return error;
    }
  },
};

const companyMutations = {
  async createCompany(root, { company }) {
    try {
      const { password } = company;
      const passwordHash = await generatePasswordHash(password);

      const createdCompany = await CompanyRepository.save({
        ...company,
        password: passwordHash
      });

      return createdCompany;
    } catch (error) {
      return error;
    }
  },
};

module.exports = {
  companyQueries,
  companyMutations,
};
