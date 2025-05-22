// Salvar em: backend/src/middleware/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // Cache por 5 minutos

module.exports = (req, res, next) => {
  const key = `${req.method}_${req.url}`;
  const cached = cache.get(key);
  if (cached) return res.json(cached);
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  next();
};
