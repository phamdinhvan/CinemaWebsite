const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  process.env.DATABASE_URL || "postgres://postgres:5432@localhost:5432/LTWEB2"
);
