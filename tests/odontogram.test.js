// Salvar em: tests/odontogram.test.js
const { expect } = require('chai');
const Odontogram = require('../backend/src/models/Odontogram');
const pool = require('../backend/src/database');

describe('Odontogram Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM odontogram');
  });

  it('should create an odontogram record', async () => {
    const odontogram = await Odontogram.create({
      patient_id: 1,
      dentist_id: 2,
      tooth_number: 11,
      condition: 'Caries',
      material: 'Resina',
      notes: 'Tratamento concluído',
      date: '2025-05-22'
    });
    expect(odontogram).to.have.property('id');
    expect(odontogram.tooth_number).to.equal(11);
  });

  it('should find all odontogram records', async () => {
    await Odontogram.create({
      patient_id: 1,
      dentist_id: 2,
      tooth_number: 11,
      condition: 'Caries',
      material: 'Resina',
      notes: 'Tratamento concluído',
      date: '2025-05-22'
    });
    const odontograms = await Odontogram.findAll();
    expect(odontograms).to.be.an('array').with.lengthOf(1);
  });
});
