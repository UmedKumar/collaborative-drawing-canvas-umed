const rooms = {};

function getRoom(roomId) {
  if (!rooms[roomId]) rooms[roomId] = [];
  return rooms[roomId];
}

module.exports = { getRoom };
