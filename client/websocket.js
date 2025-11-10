let socket;

function setupWebSocket(canvasHandler) {
  const isLocal = window.location.hostname === "localhost";

  const backendUrl = isLocal
    ? "ws://localhost:8080" 
    : "wss://collaborative-drawing-server.onrender.com"; 

  socket = new WebSocket(backendUrl);

  socket.onopen = () => console.log("✅ Connected to server");

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    switch (data.type) {
      case "draw":
        canvasHandler.applyRemotePath(data.path);
        break;
      case "undo":
        canvasHandler.applyUndo();
        break;
      case "redo":
        canvasHandler.applyRedo();
        break;
    }
  };
}

function sendDrawing(path) {
  socket.send(JSON.stringify({ type: "draw", path }));
}

function sendUndo() {
  socket.send(JSON.stringify({ type: "undo" }));
}

function sendRedo() {
  socket.send(JSON.stringify({ type: "redo" }));
}
