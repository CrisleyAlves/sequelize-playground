const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const TechModel = require("../modules/tech/model/Tech");
const CompanyModel = require("../modules/company/model/Company");
const UserModel = require('../modules/user/model/User');
const AddressModel = require("../modules/address/model/Address");

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
