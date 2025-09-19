// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./util/db');           // Sequelize instance
const contactRoutes = require('./routes/contactRoutes');  // Your routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRoutes);

// DB connection and sync
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();  // Synchronize models (create tables if needed)
  })
  .then(() => {
    console.log('Tables synced');
    // Start server only after DB is ready
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to DB:', err);
  });
