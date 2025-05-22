// Salvar em: backend/src/models/Maintenance.js
const pool = require('../database');

class Maintenance {
  static async create({ equipment, supplier, date }) {
    const { rows } = await pool.query(
      'INSERT INTO maintenance (equipment, supplier, date) VALUES ($1, $2, $3) RETURNING *',
      [equipment, supplier, date]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM maintenance');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM maintenance WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { rows } = await pool.query(
      'UPDATE maintenance SET equipment = $1, supplier = $2, date = $3 WHERE id = $4 RETURNING *',
      [updates.equipment, updates.supplier, updates.date, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM maintenance WHERE id = $1', [id]);
  }
}

module.exports = Maintenance;
