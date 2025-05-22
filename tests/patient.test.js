// Salvar em: tests/patient.test.js
const { expect } = require('chai');
const Patient = require('../backend/src/models/Patient');
const pool = require('../backend/src/database');

describe('Patient Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users WHERE role = $1', ['patient']);
  });

  it('should create a patient', async () => {
    const patient = await Patient.create({
      cpf: '12345678901',
      name: 'João Silva',
      age: 30,
      address: 'Rua A, 123',
      phone: '11987654321',
      email: 'joao@example.com'
    });
    expect(patient).to.have.property('id');
    expect(patient.name).to.equal('João Silva');
  });

  it('should find all patients', async () => {
    await Patient.create({
      cpf: '12345678901',
      name: 'João Silva',
      age: 30,
      address: 'Rua A, 123',
      phone: '11987654321',
      email: 'joao@example.com'
    });
    const patients = await Patient.findAll();
    expect(patients).to.be.an('array').with.lengthOf(1);
  });
});
