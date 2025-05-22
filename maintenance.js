const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM maintenance');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { equipment, supplier, date } = req.body;
  await pool.query('INSERT INTO maintenance (equipment, supplier, date) VALUES ($1, $2, $3)', [equipment, supplier, date]);
  res.json({ message: 'Maintenance scheduled' });
});

module.exports = router;
