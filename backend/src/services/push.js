// Salvar em: backend/src/services/push.js
const webpush = require('web-push');
require('dotenv').config();

webpush.setVapidDetails(
  'mailto:support@odontortl.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendPush = async (subscription, payload) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (err) {
    console.error('Erro ao enviar notificação push:', err);
  }
};

module.exports = { sendPush };
