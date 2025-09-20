const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./util/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/contact', contactRoutes);

let isDBConnected = false;
async function connectDB() {
  if (!isDBConnected) {
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync();
    console.log('Tables synced');
    isDBConnected = true;
  }
}

module.exports = async (req, res) => {
  try {
    await connectDB();
    app(req, res);
  } catch (err) {
    console.error('Error connecting to DB:', err);
    res.status(500).send('Failed to connect to database');
  }
};
