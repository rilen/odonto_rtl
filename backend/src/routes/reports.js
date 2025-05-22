// Salvar em: backend/src/routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const cache = require('../middleware/cache');

router.get('/patients', cache, async (req, res) => {
  const { rows } = await pool.query('SELECT id, name, cpf, status FROM users WHERE role = $1', ['patient']);
  res.json(rows);
});

router.get('/payments', cache, async (req, res) => {
  const { rows } = await pool.query('SELECT id, patient_id, amount, status FROM payments');
  res.json(rows);
});

router.get('/surveys', cache, async (req, res) => {
  const { rows } = await pool.query('SELECT id, patient_id, attendance, comfort, pain, confidence FROM surveys');
  res.json(rows);
});

router.get('/maintenance', cache, async (req, res) => {
  const { rows } = await pool.query('SELECT id, equipment, supplier, date FROM maintenance');
  res.json(rows);
});

module.exports = router;
