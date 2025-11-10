#  Real-Time Collaborative Drawing Canvas

A lightweight web app that lets multiple users draw together on the same canvas in **real time**.
Built from scratch using **HTML5 Canvas**, **Node.js**, and **WebSockets**, it focuses on real-time synchronization, conflict handling, and smooth multi-user interaction — without any frontend frameworks.

---

##  Features

*  **Drawing Tools:** Brush, eraser, color picker, and adjustable stroke width
*  **Real-time Sync:** Instantly see other users’ drawings as they happen
*  **Live Cursors:** Each user’s cursor and color are visible on everyone’s screen
*  **Undo/Redo:** Works globally across all users
*  **User Management:** Displays online users with unique color identifiers
*  **Smooth & Responsive:** Optimized canvas updates and event handling

---

##  Tech Stack

| Component    | Technology                              |
| ------------ | --------------------------------------- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript         |
| **Backend**  | Node.js, Express, Socket.io             |
| **Protocol** | WebSocket (for real-time communication) |

---

##  Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/UmedKumar/Collaborative-Drawing-Canvas.git
cd Collaborative-Drawing-Canvas
npm install
npm start
```

Now open the app in your browser:

```
http://localhost:8080
```

To test with multiple users, open the same URL in different tabs or devices on the same network.

---

##  How It Works (Brief Overview)

Each client connects to the server via **WebSocket**.
Every drawing action (start, move, end) is serialized into a stroke event and broadcast to all connected clients.
The canvas on each client listens for incoming draw events and updates the screen in real time.

The **global undo/redo system** works by maintaining a shared history of operations on the server and broadcasting state changes when someone triggers undo or redo.

---

##  Folder Structure

```
collaborative-canvas/
├── client/
│   ├── index.html
│   ├── style.css
│   ├── canvas.js          # Canvas drawing logic
│   ├── websocket.js       # WebSocket client connection
│   └── main.js            # App initialization
├── server/
│   ├── server.js          # Express + Socket.io setup
│   ├── rooms.js           # Manages user rooms and sessions
│   └── drawing-state.js   # Tracks drawing history and undo/redo logic
├── package.json
├── README.md
└── ARCHITECTURE.md
```

---

##  Testing

* Open multiple browser tabs or devices
* Draw simultaneously — changes appear instantly on all screens
* Try undo/redo actions to verify global synchronization
* Disconnect/reconnect a user to see consistent state handling

---

##  Time Spent

Roughly **3 days** of development:

* Day 1 → Base structure, Canvas drawing, and sync setup
* Day 2 → User tracking, live cursors, and real-time updates
* Day 3 → Undo/redo, cleanup, and testing

---

##  Future Enhancements

* Touch support for mobile devices
* Multiple drawing rooms
* Save/load sessions
* Shape tools (rectangle, circle, text)
* FPS and latency indicators

---

##  Author

Developed by **Umed Kumar**
