const { Sequelize } = require('sequelize');
const pg = require('pg'); // Import pg explicitly
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database username
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST,    // Hostname
    port: process.env.DB_PORT || 5432, // Port
    dialect: 'postgres',            // Use Postgres dialect
    dialectModule: pg,              // Explicitly set pg module
    logging: false,                 // Disable SQL logging
  }
);

module.exports = sequelize;
