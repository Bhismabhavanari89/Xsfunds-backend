const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./util/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/contact", contactRoutes);

// Test DB connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync(); // creates table if not exists
  })
  .then(() => console.log("Tables synced"))
  .catch(err => console.error("Error connecting to DB:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
