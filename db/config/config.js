// Config required by sequelize cli
require('dotenv').config()

const defaultConfig = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'postgres'
};

module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production: defaultConfig
}
