const sequelize = require("../../common/database/index");

module.exports = () => {
  return Promise.all(Object.keys(sequelize.models).map(key => {
    return sequelize.models[key].destroy({ restartIdentity: true, truncate: true, cascade: true });
  }))
};
