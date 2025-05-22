// Salvar em: tests/push.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../backend/src/server');

describe('Notificações Push', () => {
  it('deve registrar uma subscrição push', async () => {
    const res = await request(app)
      .post('/api/push/subscribe')
      .send({
        userId: 1,
        subscription: {
          endpoint: 'https://example.com',
          keys: { p256dh: 'key', auth: 'auth' }
        }
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
  });

  it('deve enviar uma notificação push', async () => {
    const res = await request(app)
      .post('/api/push/notify')
      .send({ userId: 1, title: 'Teste', body: 'Notificação de teste' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
  });
});
