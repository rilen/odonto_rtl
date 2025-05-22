// Salvar em: backend/src/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { createEvent } = require('../services/googleCalendar');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { patient_id, dentist_id, date, type, status, confirmed, accessToken } = req.body;
  try {
    const appointment = await Appointment.create({ patient_id, dentist_id, date, type, status, confirmed });
    if (accessToken) {
      const event = await createEvent({ patient_id, dentist_id, date, type, accessToken });
      appointment.googleEventId = event.id;
    }
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const { patient_id } = req.query;
  try {
    const appointments = patient_id
      ? await Appointment.findAll({ where: { patient_id } })
      : await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.update(req.params.id, req.body);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Appointment.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
