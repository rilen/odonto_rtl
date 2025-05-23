// Salvar em: backend/src/server.js
const express = require('express');
const http = require('http');
const formidable = require('formidable');
const { setupWebSocket } = require('./services/websocket');
const { startScheduler } = require('./services/scheduler');

const app = express();
const server = http.createServer(app);

// ✅ Importação dos middlewares
const securityMiddleware = require('./middleware/security');
const authMiddleware = require('./middleware/auth');
const auditMiddleware = require('./middleware/audit');

console.log('Security Middleware:', securityMiddleware);
console.log('Auth Middleware:', authMiddleware);
console.log('Audit Middleware:', auditMiddleware);

// ✅ Aplicando os middlewares corretamente
app.use(...securityMiddleware); // Spread para funções individuais
app.use(authMiddleware);
app.use(auditMiddleware);
app.use(express.json());

// ✅ Aplicação correta do formidable (não é middleware por padrão)
app.use((req, res, next) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
        req.fields = fields;
        req.files = files;
        next();
    });
});

// ✅ Definição de rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', authMiddleware, auditMiddleware, require('./routes/users'));
app.use('/api/appointments', authMiddleware, auditMiddleware, require('./routes/appointments'));
app.use('/api/payments', authMiddleware, auditMiddleware, require('./routes/payments'));
app.use('/api/stock', authMiddleware, auditMiddleware, require('./routes/stock'));
app.use('/api/maintenance', authMiddleware, auditMiddleware, require('./routes/maintenance'));
app.use('/api/patients', authMiddleware, auditMiddleware, require('./routes/patients'));
app.use('/api/odontogram', authMiddleware, auditMiddleware, require('./routes/odontogram'));
app.use('/api/chat', authMiddleware, auditMiddleware, require('./routes/chat'));
app.use('/api/marketing', authMiddleware, auditMiddleware, require('./routes/marketing'));
app.use('/api/visitor', authMiddleware, auditMiddleware, require('./routes/visitor'));
app.use('/api/survey', authMiddleware, auditMiddleware, require('./routes/survey'));
app.use('/api/reports', authMiddleware, auditMiddleware, require('./routes/reports'));
app.use('/api/twofactor', authMiddleware, auditMiddleware, require('./routes/twofactor'));
app.use('/api/push', authMiddleware, auditMiddleware, require('./routes/push'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/audit', authMiddleware, auditMiddleware, require('./routes/audit'));

// ✅ Iniciando serviços e o servidor
setupWebSocket(server);
startScheduler();

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
