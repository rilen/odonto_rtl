// Salvar em: backend/src/models/User.js
const pool = require('../database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ cpf, password, role, name, age, address, phone, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (cpf, password, role, name, age, address, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [cpf, hashedPassword, role, name, age, address, phone, email]
    );
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  }

  static async findByCpf(cpf) {
    const { rows } = await pool.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
    return rows[0];
  }

  static async update(id, updates) {
    const hashedPassword = updates.password ? await bcrypt.hash(updates.password, 10) : undefined;
    const { rows } = await pool.query(
      'UPDATE users SET cpf = $1, password = COALESCE($2, password), role = $3, name = $4, age = $5, address = $6, phone = $7, email = $8 WHERE id = $9 RETURNING *',
      [updates.cpf, hashedPassword, updates.role, updates.name, updates.age, updates.address, updates.phone, updates.email, id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = User;
