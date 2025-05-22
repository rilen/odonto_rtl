// Salvar em: tests/stripe.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../backend/src/server');
const Payment = require('../backend/src/models/Payment');

describe('Stripe Integration', () => {
  beforeEach(async () => {
    await Payment.create({
      patient_id: 1,
      amount: 200,
      status: 'pending',
      method: 'card',
      receipt_number: '12345',
      date: '2025-05-22'
    });
  });

  it('should create a checkout session', async () => {
    const res = await request(app)
      .post('/api/stripe/checkout')
      .set('Authorization', `Bearer ${process.env.TEST_JWT_TOKEN}`)
      .send({ amount: 200, patient_id: 1, payment_id: 1 });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
  });
});
