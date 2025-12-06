const supabase = require("../util/supabaseClient");

// CREATE CONTACT
exports.createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone are required" });
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ name, email, phone, message }]);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({
    message: "Contact saved successfully",
    data
  });
};

// GET ALL CONTACTS
exports.getContacts = async (req, res) => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*");

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};
