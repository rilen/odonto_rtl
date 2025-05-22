const jwt = require('jsonwebtoken');
const db = require('../database');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    db.get('SELECT locked FROM users WHERE id = ?', [decoded.id], (err, user) => {
      if (user.locked) return res.status(403).json({ error: 'Account locked' });
      req.user = decoded;
      next();
    });
  });
};
