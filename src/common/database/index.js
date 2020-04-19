const Sequelize = require("sequelize");
const dbConfig = require("./config");

const TechModel = require("../models/Tech");
const CompanyModel = require("../models/Company");
const UserModel = require('../models/User');
const AddressModel = require("../models/Address");

const sequelize = new Sequelize(dbConfig);

UserModel.init(sequelize);
AddressModel.init(sequelize);
AddressModel.init(sequelize);
TechModel.init(sequelize);
CompanyModel.init(sequelize);

AddressModel.associate(sequelize.models);
UserModel.associate(sequelize.models);
TechModel.associate(sequelize.models);

module.exports = sequelize;
