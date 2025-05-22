const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database(':memory:');
const secret = 'your_jwt_secret';
app.use((req, res, next) => {
  console.log(`Access: ${req.method} ${req.url} at ${new Date()}`);
  next();
});
app.post('/login', (req, res) => {
  const { cpf, password } = req.body;
  db.get('SELECT * FROM users WHERE cpf = ? AND password = ?', [cpf, password], (err, user) => {
    if (err || !user) {
      db.run('INSERT INTO login_attempts (cpf, timestamp) VALUES (?, ?)', [cpf, Date.now()]);
      db.get('SELECT COUNT(*) as count FROM login_attempts WHERE cpf = ?', [cpf], (err, row) => {
        if (row.count >= 3) return res.status(403).json({ error: 'Account locked' });
        res.status(401).json({ error: 'Invalid credentials' });
      });
      return;
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secret);
    res.json({ token });
  });
});
app.listen(3000, () => console.log('Server running on port 3000'));
