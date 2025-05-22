// Salvar em: tests/chat.test.js
const { expect } = require('chai');
const WebSocket = require('ws');

describe('Chat WebSocket', () => {
  let ws;

  beforeEach((done) => {
    ws = new WebSocket('ws://localhost:3000');
    ws.on('open', done);
  });

  afterEach(() => {
    ws.close();
  });

  it('should receive a message', (done) => {
    const testMessage = { user_id: 1, role: 'secretary', content: 'Teste', timestamp: new Date().toISOString() };
    ws.on('message', (data) => {
      const message = JSON.parse(data);
      expect(message).to.deep.equal(testMessage);
      done();
    });
    ws.send(JSON.stringify(testMessage));
  });
});
