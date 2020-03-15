const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      logo_url: DataTypes.STRING,
      description: DataTypes.STRING,
      business_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize
    });
  };
}

module.exports = Company;
