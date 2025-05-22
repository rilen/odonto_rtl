// Salvar em: backend/src/server.js
const express = require('express');
const formidable = require('formidable');
const http = require('http');
const { setupWebSocket } = require('./services/websocket');
const { startScheduler } = require('./services/scheduler');

const app = express();
const server = http.createServer(app);

app.use(require('./middleware/security'));
app.use(express.json());
app.use(formidable());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./middleware/auth'), require('./middleware/audit'), require('./routes/users'));
app.use('/api/appointments', require('./middleware/auth'), require('./middleware/audit'), require('./routes/appointments'));
app.use('/api/payments', require('./middleware/auth'), require('./middleware/audit'), require('./routes/payments'));
app.use('/api/stock', require('./middleware/auth'), require('./middleware/audit'), require('./routes/stock'));
app.use('/api/maintenance', require('./middleware/auth'), require('./middleware/audit'), require('./routes/maintenance'));
app.use('/api/patients', require('./middleware/auth'), require('./middleware/audit'), require('./routes/patients'));
app.use('/api/odontogram', require('./middleware/auth'), require('./middleware/audit'), require('./routes/odontogram'));
app.use('/api/chat', require('./middleware/auth'), require('./middleware/audit'), require('./routes/chat'));
app.use('/api/marketing', require('./middleware/auth'), require('./middleware/audit'), require('./routes/marketing'));
app.use('/api/visitor', require('./middleware/auth'), require('./middleware/audit'), require('./routes/visitor'));
app.use('/api/survey', require('./middleware/auth'), require('./middleware/audit'), require('./routes/survey'));
app.use('/api/reports', require('./middleware/auth'), require('./middleware/audit'), require('./routes/reports'));
app.use('/api/twofactor', require('./middleware/auth'), require('./middleware/audit'), require('./routes/twofactor'));
app.use('/api/push', require('./middleware/auth'), require('./middleware/audit'), require('./routes/push'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/audit', require('./middleware/auth'), require('./middleware/audit'), require('./routes/audit'));

setupWebSocket(server);
startScheduler();

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
