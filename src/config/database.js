// require("dotenv").config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'sqlnode',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'sqlnode-test',
    define: {
      timestamps: true,
      underscored: true,
    },
  }
};
