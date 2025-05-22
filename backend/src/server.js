const express = require('express');
const formidable = require('formidable');
const http = require('http');
const { setupWebSocket } = require('./services/websocket');

const app = express();
const server = http.createServer(app);

//app.get('/', (req, res) => {
//  res.send('Servidor rodando! 🚀');
//});

app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});



app.use(require('./middleware/security'));
app.use(express.json());

// Middleware para usar formidable corretamente
app.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'].includes('multipart/form-data')) {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                return next(err);
            }
            req.body = fields;
            req.files = files;
            next();
        });
    } else {
        next();
    }
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/stock', require('./routes/stock'));
app.use('/api/maintenance', require('./routes/maintenance'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/odontogram', require('./routes/odontogram'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/marketing', require('./routes/marketing'));
app.use('/api/visitor', require('./routes/visitor'));
app.use('/api/survey', require('./routes/survey'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/twofactor', require('./routes/twofactor'));
app.use('/api/push', require('./routes/push'));

setupWebSocket(server);

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
