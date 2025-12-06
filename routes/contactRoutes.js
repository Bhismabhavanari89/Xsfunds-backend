const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contactController");

// POST: create new contact
router.post("/", createContact);

// GET: get all contacts
router.get("/", getContacts);

module.exports = router;
