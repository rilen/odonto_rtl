// Salvar em: backend/src/routes/appointments.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const auth = require('../middleware/auth');
const { sendWhatsAppMessage } = require('../services/whatsapp');

router.get('/', auth, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM appointments WHERE patient_id = $1 OR dentist_id = $1', [req.user.id]);
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { patient_id, dentist_id, date, type } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO appointments (patient_id, dentist_id, date, type, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [patient_id, dentist_id, date, type, 'pending']
  );
  res.json(rows[0]);
});

router.put('/:id/confirm', auth, async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'UPDATE appointments SET status = $1, confirmed = $2 WHERE id = $3 RETURNING *',
    ['confirmed', true, id]
  );

  if (rows.length > 0) {
    const appt = rows[0];
    const user = await pool.query('SELECT name, phone FROM users WHERE id = $1', [appt.patient_id]);
    const message = `Olá ${user.rows[0].name}, seu agendamento de ${appt.type} para ${new Date(appt.date).toLocaleString('pt-BR')} foi confirmado!`;
    await sendWhatsAppMessage(user.rows[0].phone, message);
  }

  res.json(rows[0]);
});

module.exports = router;
