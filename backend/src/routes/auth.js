// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
    if (rows.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, cpf: user.cpf, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
