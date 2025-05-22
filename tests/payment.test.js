// Salvar em: tests/payment.test.js
const { expect } = require('chai');
const Payment = require('../backend/src/models/Payment');
const pool = require('../backend/src/database');

describe('Payment Model', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM payments');
  });

  it('should create a payment', async () => {
    const payment = await Payment.create({
      patient_id: 1,
      amount: 200,
      status: 'paid',
      method: 'credit',
      receipt_number: '12345',
      date: '2025-05-22'
    });
    expect(payment).to.have.property('id');
    expect(payment.amount).to.equal(200);
  });

  it('should find all payments', async () => {
    await Payment.create({
      patient_id: 1,
      amount: 200,
      status: 'paid',
      method: 'credit',
      receipt_number: '12345',
      date: '2025-05-22'
    });
    const payments = await Payment.findAll();
    expect(payments).to.be.an('array').with.lengthOf(1);
  });
});
