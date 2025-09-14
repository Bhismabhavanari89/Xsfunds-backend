const twilio = require('twilio');

const accountSid = process.env.accountSid;       // From Twilio Console
const authToken = process.env.authToken;         // From Twilio Console
const client = new twilio(accountSid, authToken);

async function sendWhatsAppMessage(message) {
  try {
    const messageInstance = await client.messages.create({
      from: process.env.whatsappsend,    // Twilio Sandbox WhatsApp number
      to: process.env.whatsappto,         // Recipient's WhatsApp number in E.164 format
      body: message
    });
    console.log('Message sent:', messageInstance.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}

module.exports = sendWhatsAppMessage;
