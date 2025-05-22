const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../database');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { cpf, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
  if (!rows.length) return res.status(401).json({ error: 'Usuário não encontrado' });
  if (rows[0].locked) return res.status(403).json({ error: 'Conta bloqueada' });
  const isValid = await bcrypt.compare(password, rows[0].password);
  if (!isValid) {
    await pool.query('INSERT INTO login_attempts (cpf, timestamp) VALUES ($1, $2)', [cpf, Date.now()]);
    const attempts = await pool.query('SELECT COUNT(*) FROM login_attempts WHERE cpf = $1 AND timestamp > $2', [cpf, Date.now() - 3600000]);
    if (parseInt(attempts.rows[0].count) >= 3) {
      await pool.query('UPDATE users SET locked = TRUE WHERE cpf = $1', [cpf]);
      return res.status(403).json({ error: 'Conta bloqueada' });
    }
    return res.status(401).json({ error: 'Senha inválida' });
  }
  const token = jwt.sign({ userId: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  if (rows[0].two_factor_secret) {
    return res.json({ twoFactorRequired: true, userId: rows[0].id });
  }
  res.json({ token });
});

module.exports = router;
