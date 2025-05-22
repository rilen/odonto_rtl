// Salvar em: backend/src/models/Odontogram.js
const pool = require('../database');

class Odontogram {
  static async create({ patient_id, dentist_id, tooth_number, condition, material, notes, date }) {
    const { rows } = await pool.query(
      'INSERT INTO odontogram (patient_id, dentist_id, tooth_number, condition, material, notes, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [patient_id, dentist_id, tooth_number, condition, material, notes, date]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM odontogram');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM odontogram WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { rows } = await pool.query(
      'UPDATE odontogram SET patient_id = $1, dentist_id = $2, tooth_number = $3, condition = $4, material = $5, notes = $6, date = $7 WHERE id = $8 RETURNING *',
      [updates.patient_id, updates.dentist_id, updates.tooth_number, updates.condition, updates.material, updates.notes, updates.date, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM odontogram WHERE id = $1', [id]);
  }
}

module.exports = Odontogram;
