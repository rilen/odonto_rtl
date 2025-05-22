// Salvar em: backend/src/models/Patient.js
const pool = require('../database');

class Patient {
  static async create({ cpf, name, age, address, phone, email }) {
    const { rows } = await pool.query(
      'INSERT INTO users (cpf, role, name, age, address, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [cpf, 'patient', name, age, address, phone, email]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM users WHERE role = $1', ['patient']);
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1 AND role = $2', [id, 'patient']);
    return rows[0];
  }

  static async update(id, updates) {
    const { rows } = await pool.query(
      'UPDATE users SET cpf = $1, name = $2, age = $3, address = $4, phone = $5, email = $6 WHERE id = $7 AND role = $8 RETURNING *',
      [updates.cpf, updates.name, updates.age, updates.address, updates.phone, updates.email, id, 'patient']
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1 AND role = $2', [id, 'patient']);
  }
}

module.exports = Patient;
