// Config required by sequelize cli
require('dotenv').config()

const defaultConfig = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres'
};

module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production: defaultConfig
}
