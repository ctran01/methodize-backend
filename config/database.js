const config = require("./index");

const db = config.db;
const development_username = db.username;
const development_password = db.password;
const development_database = db.database;
const development_host = db.host;

module.exports = {
  development: {
    development_username,
    development_password,
    development_database,
    development_host,
    dialect: "postgres",
  },
  production: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  },
};
