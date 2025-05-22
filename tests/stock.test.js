// Salvar em: tests/stock.test.js
const { expect } = require('chai');
const Stock = require('../backend/src/models/Stock');
const pool = require('../backend/src/database');

describe('Stock Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM stock');
  });

  it('should create a stock item', async () => {
    const stock = await Stock.create({
      item_name: 'Luvas',
      quantity: 100,
      critical_level: 20,
      category: 'Consumíveis'
    });
    expect(stock).to.have.property('id');
    expect(stock.item_name).to.equal('Luvas');
  });

  it('should find all stock items', async () => {
    await Stock.create({
      item_name: 'Luvas',
      quantity: 100,
      critical_level: 20,
      category: 'Consumíveis'
    });
    const stock = await Stock.findAll();
    expect(stock).to.be.an('array').with.lengthOf(1);
  });
});
