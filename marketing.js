const express = require('express');
const router = express.Router();
const { sendWhatsApp } = require('../services/notifications');
const axios = require('axios');
require('dotenv').config();

router.post('/whatsapp', async (req, res) => {
  const { message } = req.body;
  const { rows } = await pool.query('SELECT id, phone FROM users WHERE role = $1', ['patient']);
  for (const patient of rows) {
    await sendWhatsApp(patient.id, message);
  }
  res.json({ message: 'WhatsApp reminders sent' });
});

router.post('/instagram', async (req, res) => {
  const { caption } = req.body;
  const image = req.files?.image;
  if (!image) return res.status(400).json({ error: 'Image required' });

  const formData = new FormData();
  formData.append('image', image.data, image.name);
  formData.append('caption', caption);
  await axios.post('https://graph.instagram.com/me/media?access_token=' + process.env.INSTAGRAM_TOKEN, formData);
  res.json({ message: 'Instagram post published' });
});

module.exports = router;
