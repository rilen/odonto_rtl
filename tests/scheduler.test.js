// Salvar em: tests/scheduler.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const pool = require('../backend/src/database');
const { sendWhatsAppMessage } = require('../backend/src/services/whatsapp');

describe('Scheduler', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should send WhatsApp reminder for tomorrow’s appointments', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const fakeAppointments = [{
      id: 1,
      date: tomorrow,
      type: 'Consulta',
      phone: '+5511999999999',
      name: 'João',
    }];

    sinon.stub(pool, 'query').resolves({ rows: fakeAppointments });
    const sendStub = sinon.stub().resolves();
    sinon.replace(require('../backend/src/services/whatsapp'), 'sendWhatsAppMessage', sendStub);

    const { startScheduler } = require('../backend/src/services/scheduler');
    startScheduler();

    clock.tick(24 * 60 * 60 * 1000); // Advance to 8 AM next day

    expect(sendStub.calledOnce).to.be.true;
    expect(sendStub.calledWith('+5511999999999', sinon.match('Olá João, lembrete: você tem um agendamento de Consulta amanhã'))).to.be.true;

    pool.query.restore();
    sinon.restore();
  });
});
