const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryCode: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "+91",
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, {
  tableName: "contacts",
  timestamps: true,
});

module.exports = Contact;
