// Salvar em: backend/src/models/Appointment.js
const pool = require('../database');

class Appointment {
  static async create({ patient_id, dentist_id, date, type, status, confirmed }) {
    const { rows } = await pool.query(
      'INSERT INTO appointments (patient_id, dentist_id, date, type, status, confirmed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [patient_id, dentist_id, date, type, status, confirmed]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM appointments');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { rows } = await pool.query(
      'UPDATE appointments SET patient_id = $1, dentist_id = $2, date = $3, type = $4, status = $5, confirmed = $6 WHERE id = $7 RETURNING *',
      [updates.patient_id, updates.dentist_id, updates.date, updates.type, updates.status, updates.confirmed, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
  }
}

module.exports = Appointment;
