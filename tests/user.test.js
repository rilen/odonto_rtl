// Salvar em: tests/user.test.js
const { expect } = require('chai');
const User = require('../backend/src/models/User');
const pool = require('../backend/src/database');

describe('User Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  it('should create a user', async () => {
    const user = await User.create({
      cpf: '12345678901',
      password: 'password123',
      role: 'patient',
      name: 'João Silva',
      age: 30,
      address: 'Rua A, 123',
      phone: '11987654321',
      email: 'joao@example.com'
    });
    expect(user).to.have.property('id');
    expect(user.name).to.equal('João Silva');
  });

  it('should find all users', async () => {
    await User.create({
      cpf: '12345678901',
      password: 'password123',
      role: 'patient',
      name: 'João Silva',
      age: 30,
      address: 'Rua A, 123',
      phone: '11987654321',
      email: 'joao@example.com'
    });
    const users = await User.findAll();
    expect(users).to.be.an('array').with.lengthOf(1);
  });
});
