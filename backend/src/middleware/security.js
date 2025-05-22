// Salvar em: backend/src/middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 requisições por IP
  message: 'Limite de requisições excedido. Tente novamente mais tarde.'
});

module.exports = [
  helmet(), // Protege contra vulnerabilidades comuns (XSS, clickjacking, etc.)
  cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }), // Configura CORS
  limiter, // Aplica rate limiting
  (req, res, next) => {
    // Validação básica de headers
    if (!req.headers['content-type'] && req.method !== 'GET') {
      return res.status(400).json({ error: 'Content-Type não especificado' });
    }
    next();
  }
];
