const { Company } = require('./companies/schema')
const { companyMutations, companyQueries } = require('./companies/resolvers')

const resolvers = {
  Query: {
    ...companyQueries,
  },
  Mutation: {
    ...companyMutations,
  }
};

const typeDefs = [
  Company,
];

module.exports = { resolvers, typeDefs };