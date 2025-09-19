const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database username
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST,    // Hostname
    port: process.env.DB_PORT || 5432, // Port (default 5432 for Postgres)
    dialect: 'postgres',            // Use Postgres dialect
    logging: false,                 // Disable logging SQL queries
  }
);

module.exports = sequelize;
