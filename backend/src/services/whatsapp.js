// Salvar em: backend/src/services/whatsapp.js
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function sendWhatsApp({ phone, message }) {
  await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_PHONE}`,
    to: `whatsapp:${phone}`,
    body: message
  });
  console.log(`WhatsApp enviado para ${phone}`);
}

module.exports = { sendWhatsApp };
