const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const TechModel = require("../modules/tech/model/Tech");
const CompanyModel = require("../modules/company/model/Company");
const UserModel = require('../modules/user/model/User');
const AddressModel = require("../modules/address/model/Address");

const connection = new Sequelize(dbConfig);

UserModel.init(connection);
AddressModel.init(connection);
AddressModel.init(connection);
TechModel.init(connection);
CompanyModel.init(connection);

AddressModel.associate(connection.models);
UserModel.associate(connection.models);
TechModel.associate(connection.models);

module.exports = connection;
