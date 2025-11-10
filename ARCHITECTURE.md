
---

## 🧱 ARCHITECTURE.md
```markdown
# Architecture Overview

## Data Flow Diagram
User → Canvas → WebSocket Client → WebSocket Server → Broadcast → Other Clients → Canvas Render

## WebSocket Protocol
- `draw`: Sent when a user draws a stroke
- `undo`: Sent when user clicks undo
- `redo`: Sent when user clicks redo

## Undo/Redo Strategy
Global undo/redo managed by `DrawingState` class shared across sessions.

## Performance Decisions
- Batching strokes before sending over socket for smoother updates
- Minimal canvas re-rendering for performance

## Conflict Resolution
Latest event wins — broadcast from server ensures consistent state
