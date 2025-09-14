const Contact = require("../models/contact");
const sendWhatsAppMessage = require('../controllers/sendWhatsapp'); 

// Create a new contact
exports.createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Phone must be 10 digits" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      phone,
      countryCode: "+91",
    });
    const message = `New contact added:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
    await sendWhatsAppMessage(message);
    return res.status(201).json({ message: "Contact saved successfully"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
