// Salvar em: backend/src/models/Stock.js
const pool = require('../database');

class Stock {
  static async create({ item_name, quantity, critical_level, category }) {
    const { rows } = await pool.query(
      'INSERT INTO stock (item_name, quantity, critical_level, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [item_name, quantity, critical_level, category]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM stock');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM stock WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { rows } = await pool.query(
      'UPDATE stock SET item_name = $1, quantity = $2, critical_level = $3, category = $4 WHERE id = $5 RETURNING *',
      [updates.item_name, updates.quantity, updates.critical_level, updates.category, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM stock WHERE id = $1', [id]);
  }
}

module.exports = Stock;
