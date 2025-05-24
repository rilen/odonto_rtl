// backend/src/routes/users.js
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { cpf, password, role, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (cpf, password, role, name) VALUES ($1, $2, $3, $4) RETURNING *',
      [cpf, hashedPassword, role, name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Database error:', err); // Log the error
    res.status(500).json({ error: 'Erro ao criar usuário', details: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, cpf, name, role FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, cpf, name, phone, email, address, role FROM users WHERE id = $1',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

router.put('/me', auth, async (req, res) => {
  const { name, phone, email, address } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE users SET name = $1, phone = $2, email = $3, address = $4 WHERE id = $5 RETURNING *',
      [name, phone, email, address, req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

module.exports = router;
