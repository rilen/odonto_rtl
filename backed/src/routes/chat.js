const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { rows } = await pool.query('SELECT * FROM chat WHERE sender_id = $1 OR receiver_id = $1', [userId]);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { sender_id, role, content } = req.body;
  const receiver_id = role === 'dentist' ? (await pool.query('SELECT id FROM users WHERE role = $1', ['secretary'])).rows[0].id : 
                      (await pool.query('SELECT id FROM users WHERE role = $1', ['dentist'])).rows[0].id;
  await pool.query('INSERT INTO chat (sender_id, receiver_id, content, timestamp) VALUES ($1, $2, $3, $4)', 
    [sender_id, receiver_id, content, Date.now()]);
  res.json({ message: 'Message sent' });
});

module.exports = router;
