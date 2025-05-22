const express = require('express');
const router = express.Router();
const pool = require('../database');

// Buscar registros do odontograma
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM odontogram');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar registros do odontograma' });
  }
});

module.exports = router;
