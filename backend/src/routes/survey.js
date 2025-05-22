const express = require('express');
const router = express.Router();
const pool = require('../database');

// Buscar todas as pesquisas
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM surveys');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pesquisas' });
  }
});

module.exports = router;
