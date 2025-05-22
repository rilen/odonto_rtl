const express = require('express');
const router = express.Router();
const pool = require('../database');

// Buscar todos os pacientes
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM patients');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
});

module.exports = router;
