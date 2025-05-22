// Salvar em: tests/twofactor.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../backend/src/server');

describe('Autenticação 2FA', () => {
  it('deve gerar código 2FA', async () => {
    const res = await request(app)
      .post('/api/twofactor/generate')
      .send({ userId: 1 });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
  });

  it('deve verificar código 2FA válido', async () => {
    // Simula um código válido (depende do ambiente de teste)
    const res = await request(app)
      .post('/api/twofactor/verify')
      .send({ userId: 1, code: '123456' }); // Código fictício
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success');
  });
});
