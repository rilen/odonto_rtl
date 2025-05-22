// Salvar em: backend/src/routes/twofactor.js
const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const pool = require('../database');
const { sendWhatsApp } = require('../services/notifications');

router.post('/generate', async (req, res) => {
  const { userId } = req.body;
  const secret = speakeasy.generateSecret({ length: 20 });
  await pool.query('UPDATE users SET two_factor_secret = $1 WHERE id = $2', [secret.base32, userId]);
  const code = speakeasy.totp({ secret: secret.base32, encoding: 'base32' });
  const { rows } = await pool.query('SELECT phone FROM users WHERE id = $1', [userId]);
  await sendWhatsApp({ phone: rows[0].phone }, `Seu código 2FA é: ${code}`);
  res.json({ success: true });
});

router.post('/verify', async (req, res) => {
  const { userId, code } = req.body;
  const { rows } = await pool.query('SELECT two_factor_secret FROM users WHERE id = $1', [userId]);
  const verified = speakeasy.totp.verify({
    secret: rows[0].two_factor_secret,
    encoding: 'base32',
    token: code,
    window: 1
  });
  res.json({ success: verified });
});

module.exports = router;
