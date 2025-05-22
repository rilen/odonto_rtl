// Salvar em: backend/src/services/websocket.js
const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    });
  });

  return wss;
}

module.exports = { setupWebSocket };
