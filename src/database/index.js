const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const UserModel = require("../models/User");
const AddressModel = require("../models/Address");
const TechModel = require("../models/Tech");

const connection = new Sequelize(dbConfig);

UserModel.init(connection);
AddressModel.init(connection);
AddressModel.init(connection);
TechModel.init(connection);

AddressModel.associate(connection.models);
UserModel.associate(connection.models);
TechModel.associate(connection.models);

module.exports = connection;
