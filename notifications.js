const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendEmail = async (userId, message) => {
  const { rows } = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: rows[0].email,
    subject: 'Odonto RTL - Confirmação de Consulta',
    text: message
  });
};

const sendWhatsApp = async (userId, message) => {
  const { rows } = await pool.query('SELECT phone FROM users WHERE id = $1', [userId]);
  await client.messages.create({
    body: message,
    from: 'whatsapp:' + process.env.TWILIO_PHONE,
    to: 'whatsapp:' + rows[0].phone
  });
};

module.exports = { sendEmail, sendWhatsApp };
