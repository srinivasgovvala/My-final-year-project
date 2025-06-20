const { Sequelize } = require("sequelize");

// Initialize SQLite database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // This file will be created in your project directory
});

module.exports = sequelize;
