// Salvar em: tests/auth.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../backend/src/server');

describe('Autenticação', () => {
  it('deve retornar token para credenciais válidas', async () => {
    const res = await request(app)
      .post('/api/auth')
      .send({ cpf: '123.456.789-00', password: 'password123' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('deve bloquear após 3 tentativas falhas', async () => {
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/api/auth')
        .send({ cpf: '123.456.789-00', password: 'wrong' });
    }
    const res = await request(app)
      .post('/api/auth')
      .send({ cpf: '123.456.789-00', password: 'wrong' });
    expect(res.status).to.equal(403);
    expect(res.body.error).to.equal('Account locked');
  });
});
