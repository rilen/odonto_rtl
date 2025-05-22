// Salvar em: backend/src/models/Payment.js
const pool = require('../database');

class Payment {
  static async create({ patient_id, amount, status, method, receipt_number, date }) {
    const { rows } = await pool.query(
      'INSERT INTO payments (patient_id, amount, status, method, receipt_number, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [patient_id, amount, status, method, receipt_number, date]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM payments');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { rows } = await pool.query(
      'UPDATE payments SET patient_id = $1, amount = $2, status = $3, method = $4, receipt_number = $5, date = $6 WHERE id = $7 RETURNING *',
      [updates.patient_id, updates.amount, updates.status, updates.method, updates.receipt_number, updates.date, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM payments WHERE id = $1', [id]);
  }
}

module.exports = Payment;
