// Salvar em: tests/maintenance.test.js
const { expect } = require('chai');
const Maintenance = require('../backend/src/models/Maintenance');
const pool = require('../backend/src/database');

describe('Maintenance Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM maintenance');
  });

  it('should create a maintenance record', async () => {
    const maintenance = await Maintenance.create({
      equipment: 'Cadeira Odontológica',
      supplier: 'Fornecedor X',
      date: '2025-05-22'
    });
    expect(maintenance).to.have.property('id');
    expect(maintenance.equipment).to.equal('Cadeira Odontológica');
  });

  it('should find all maintenance records', async () => {
    await Maintenance.create({
      equipment: 'Cadeira Odontológica',
      supplier: 'Fornecedor X',
      date: '2025-05-22'
    });
    const maintenance = await Maintenance.findAll();
    expect(maintenance).to.be.an('array').with.lengthOf(1);
  });
});
