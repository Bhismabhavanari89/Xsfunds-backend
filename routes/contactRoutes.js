const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const Contact = require("../models/contact");
// POST /api/contact
router.post("/", contactController.createContact);
router.get(process.env.get, async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
