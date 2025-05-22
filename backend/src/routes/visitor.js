const express = require('express');
const router = express.Router();
const pool = require('../database');

// Buscar todos os visitantes
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM visitors');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar visitantes' });
  }
});

module.exports = router;
