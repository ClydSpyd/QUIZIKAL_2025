// socket.js
const socketIo = require("socket.io");
const {
  handleClientConnection,
  connectedUsers,
  socketToUserMap,
  handleHostConnection,
  updateSession,
} = require("../services/session.service");

module.exports = function initSocket(server) {
  console.log("INIT SOCKET");
  const io = socketIo(server, {
    path: "/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // handle connect event
  io.on("connection", async (socket) => {
    const { isHost } = socket.handshake.query;
    const isHostBool = isHost === "true";

    if (isHostBool) {
      handleHostConnection(io, socket);
    } else {
      handleClientConnection(socket);
    }

    // handle disconnect event
    socket.on("disconnect", () => {
      if (isHostBool) return;

      const userId = socketToUserMap[socket.id];
      if (userId) {
        const disconnectedUser = Object.values(connectedUsers).find(
          (user) => user.userId === userId
        );

        delete connectedUsers[userId];
        delete socketToUserMap[socket.id];

        // Wait a short time to ensure the user doesn't reconnect immediately
        setTimeout(() => {
          const reconnected = Object.values(connectedUsers).find(
            (user) => user.userId === disconnectedUser?.userId
          );
          if (!reconnected) {
            console.log("Broadcasting updated users list after disconnect");
            io.emit("users", Object.values(connectedUsers));
          }
        }, 500);
      }
    });

    socket.on("round-update", (payload) => {
      updateSession(socket.sessionId, payload);
      socket.broadcast.emit("session-data-client", payload);
    });
  });

  return io;
};
