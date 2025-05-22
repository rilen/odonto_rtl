const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM stock');
  res.json(rows);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  await pool.query('UPDATE stock SET quantity = $1 WHERE id = $2', [quantity, id]);
  if (quantity <= (await pool.query('SELECT critical_level FROM stock WHERE id = $1', [id])).rows[0].critical_level) {
    // Trigger notification to finance
    console.log(`Low stock alert for item ${id}`);
  }
  res.json({ message: 'Stock updated' });
});

module.exports = router;
