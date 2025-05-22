// Salvar em: backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;
  const user = await User.findByCpf(cpf);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
});

router.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    scope: ['https://www.googleapis.com/auth/calendar'],
    state: encodeURIComponent(JSON.stringify({ userId: req.query.userId })),
  });
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  const { code, state } = req.query;
  const { userId } = JSON.parse(decodeURIComponent(state));
  try {
    const { tokens } = await oauth2Client.getToken(code);
    await User.update(userId, { googleAccessToken: tokens.access_token });
    res.redirect(`${process.env.FRONTEND_URL}/calendar?success=true`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/calendar?error=${err.message}`);
  }
});

module.exports = router;
