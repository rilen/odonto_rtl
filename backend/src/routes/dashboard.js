// backend/src/routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo ao dashboard' });
});

module.exports = router;
