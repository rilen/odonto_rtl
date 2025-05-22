// Salvar em: tests/appointment.test.js
const { expect } = require('chai');
const Appointment = require('../backend/src/models/Appointment');
const pool = require('../backend/src/database');

describe('Appointment Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM appointments');
  });

  it('should create an appointment', async () => {
    const appointment = await Appointment.create({
      patient_id: 1,
      dentist_id: 2,
      date: '2025-06-01T10:00:00Z',
      type: 'Consulta',
      status: 'pending',
      confirmed: false
    });
    expect(appointment).to.have.property('id');
    expect(appointment.type).to.equal('Consulta');
  });

  it('should find all appointments', async () => {
    await Appointment.create({
      patient_id: 1,
      dentist_id: 2,
      date: '2025-06-01T10:00:00Z',
      type: 'Consulta',
      status: 'pending',
      confirmed: false
    });
    const appointments = await Appointment.findAll();
    expect(appointments).to.be.an('array').with.lengthOf(1);
  });
});
