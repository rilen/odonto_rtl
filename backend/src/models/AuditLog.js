// Salvar em: backend/src/models/AuditLog.js
const pool = require('../database');

class AuditLog {
  static async create({ user_id, action, details }) {
    const { rows } = await pool.query(
      'INSERT INTO audit_logs (user_id, action, details, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [user_id, action, details]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM audit_logs ORDER BY timestamp DESC');
    return rows;
  }
}

module.exports = AuditLog;
