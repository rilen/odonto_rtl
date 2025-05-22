// Salvar em: backend/src/routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/patients', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name, cpf, status FROM users WHERE role = $1', ['patient']);
  res.json(rows);
});

router.get('/payments', async (req, res) => {
  const { rows } = await pool.query('SELECT id, patient_id, amount, status FROM payments');
  res.json(rows);
});

module.exports = router;
