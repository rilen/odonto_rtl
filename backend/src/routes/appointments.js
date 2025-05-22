const express = require('express');
const router = express.Router();
const db = require('../src/database');
const { sendEmail, sendWhatsApp } = require('../src/services/notifications');

router.post('/', (req, res) => {
  const { patient_id, dentist_id, date, type } = req.body;
  db.run('INSERT INTO appointments (patient_id, dentist_id, date, type, status) VALUES (?, ?, ?, ?, ?)', 
    [patient_id, dentist_id, date, type, 'pending'], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      const appointmentId = this.lastID;
      sendEmail(patient_id, `Confirme sua consulta: /confirm/${appointmentId}`);
      setTimeout(() => {
        db.get('SELECT confirmed FROM appointments WHERE id = ?', [appointmentId], (err, row) => {
          if (!row.confirmed) sendWhatsApp(patient_id, 'Confirme sua consulta amanhã!');
        });
      }, 2 * 24 * 60 * 60 * 1000); // 2 days
      res.json({ id: appointmentId });
    });
});

router.get('/confirm/:id', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE appointments SET confirmed = 1 WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Consulta confirmada' });
  });
});

module.exports = router;
