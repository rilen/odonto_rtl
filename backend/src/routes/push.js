// Salvar em: backend/src/routes/push.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { sendPush } = require('../services/push');

router.post('/subscribe', async (req, res) => {
  const { userId, subscription } = req.body;
  await pool.query('INSERT INTO push_subscriptions (user_id, subscription) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET subscription = $2', [userId, JSON.stringify(subscription)]);
  res.json({ success: true });
});

router.post('/notify', async (req, res) => {
  const { userId, title, body } = req.body;
  const { rows } = await pool.query('SELECT subscription FROM push_subscriptions WHERE user_id = $1', [userId]);
  if (rows.length) {
    await sendPush(JSON.parse(rows[0].subscription), { title, body });
  }
  res.json({ success: true });
});

module.exports = router;
