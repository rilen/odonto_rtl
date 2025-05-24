// backend/src/server.js
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors({ origin: 'http://localhost:3001' })); // Allow frontend origin
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Odonto RTL funcionando!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/dashboard', authMiddleware, require('./routes/dashboard'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
