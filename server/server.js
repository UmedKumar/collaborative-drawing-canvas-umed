const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const DrawingState = require('./drawing-state');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const drawingState = new DrawingState();

app.use(express.static(path.join(__dirname, '../client')));

wss.on('connection', (ws) => {
  console.log('🟢 New client connected');

  // Send current drawing state to new client
  ws.send(JSON.stringify({ type: 'init', paths: drawingState.getAll() }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'draw':
        drawingState.addPath(data.path);
        broadcast(JSON.stringify({ type: 'draw', path: data.path }), ws);
        break;
      case 'undo':
        drawingState.undo();
        broadcast(JSON.stringify({ type: 'undo' }), ws);
        break;
      case 'redo':
        drawingState.redo();
        broadcast(JSON.stringify({ type: 'redo' }), ws);
        break;
    }
  });

  ws.on('close', () => console.log('🔴 Client disconnected'));
});

function broadcast(message, sender) {
  wss.clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const PORT = 8080;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
