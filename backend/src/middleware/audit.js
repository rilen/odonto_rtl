// Salvar em: backend/src/middleware/audit.js
const AuditLog = require('../models/AuditLog');

async function audit(req, res, next) {
  const userId = req.user?.id;
  const action = `${req.method} ${req.originalUrl}`;
  const details = JSON.stringify({ body: req.body, query: req.query });

  await AuditLog.create({ user_id: userId, action, details });
  next();
}

module.exports = audit;
