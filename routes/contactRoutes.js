const express = require("express");
const router = express.Router();
const supabase = require('./supabaseClient'); // make sure this exports your initialized supabase client

// POST /api/contact - create new contact entry
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const { data, error } = await supabase
      .from('contacts') // your Supabase table name
      .insert([{ name, email, message }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "Contact created", data });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all contacts
router.get(process.env.get, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts') // Supabase table name
      .select('*');

    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
