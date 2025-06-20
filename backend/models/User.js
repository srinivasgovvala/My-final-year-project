const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define the User model
const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = User;
