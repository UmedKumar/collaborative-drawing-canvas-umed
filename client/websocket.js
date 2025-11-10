let socket;

function setupWebSocket(canvasHandler) {
  socket = new WebSocket(`ws://${window.location.hostname}:8080`);

  socket.onopen = () => console.log('✅ Connected to server');

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    switch (data.type) {
      case 'draw':
        canvasHandler.applyRemotePath(data.path);
        break;
      case 'undo':
        canvasHandler.applyUndo();
        break;
      case 'redo':
        canvasHandler.applyRedo();
        break;
    }
  };
}

function sendDrawing(path) {
  socket.send(JSON.stringify({ type: 'draw', path }));
}

function sendUndo() {
  socket.send(JSON.stringify({ type: 'undo' }));
}

function sendRedo() {
  socket.send(JSON.stringify({ type: 'redo' }));
}
