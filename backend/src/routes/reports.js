// Salvar em: backend/src/routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const cache = require('../middleware/cache');

router.get('/patients', cache, async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const { rows } = await pool.query('SELECT id, name, cpf, status FROM users WHERE role = $1 LIMIT $2 OFFSET $3', ['patient', pageSize, offset]);
  res.json(rows);
});

router.get('/payments', cache, async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const { rows } = await pool.query('SELECT id, patient_id, amount, status FROM payments LIMIT $1 OFFSET $2', [pageSize, offset]);
  res.json(rows);
});

router.get('/surveys', cache, async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const { rows } = await pool.query('SELECT id, patient_id, attendance, comfort, pain, confidence FROM surveys LIMIT $1 OFFSET $2', [pageSize, offset]);
  res.json(rows);
});

router.get('/maintenance', cache, async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const { rows } = await pool.query('SELECT id, equipment, supplier, date FROM maintenance LIMIT $1 OFFSET $2', [pageSize, offset]);
  res.json(rows);
});

module.exports = router;
