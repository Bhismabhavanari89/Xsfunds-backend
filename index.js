const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./util/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 3000;

// Start server
async function startServer() {
  try {
    // Connect to Supabase Postgres
    await sequelize.authenticate();
    console.log("✅ Database connected to Supabase Postgres");

    // Sync all Sequelize models
    await sequelize.sync();
    console.log("✅ Tables synced");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1);
  }
}

startServer();
