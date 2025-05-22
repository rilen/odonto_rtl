// Salvar em: tests/reports.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../backend/src/server');

describe('Relatórios', () => {
  it('deve retornar lista de pacientes', async () => {
    const res = await request(app).get('/api/reports/patients');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('deve retornar relatórios de satisfação', async () => {
    const res = await request(app).get('/api/reports/surveys');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.all.keys('id', 'patient_id', 'attendance', 'comfort', 'pain', 'confidence');
  });
});
