// Salvar em: backend/src/services/scheduler.js
const cron = require('node-cron');
const pool = require('../database');
const { sendWhatsAppMessage } = require('./whatsapp');

function startScheduler() {
  // Run every day at 8 AM
  cron.schedule('0 8 * * *', async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

      const { rows } = await pool.query(
        `SELECT a.id, a.date, a.type, u.phone, u.name
         FROM appointments a
         JOIN users u ON a.patient_id = u.id
         WHERE a.date BETWEEN $1 AND $2
         AND a.status = 'confirmed'`,
        [startOfDay, endOfDay]
      );

      for (const appt of rows) {
        const message = `Olá ${appt.name}, lembrete: você tem um agendamento de ${appt.type} amanhã às ${new Date(appt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
        await sendWhatsAppMessage(appt.phone, message);
      }
    } catch (err) {
      console.error('Erro no agendamento de lembretes:', err);
    }
  });
}

module.exports = { startScheduler };
