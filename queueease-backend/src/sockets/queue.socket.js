// ============================================
// Queue Socket Handler
// ============================================
// Sets up Socket.IO events for real-time
// queue updates. Clients join clinic-specific
// rooms and receive live token updates.

const setupQueueSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected to sockets: ${socket.id}`);

    /**
     * Web/Mobile app emits "join:clinic" to subscribe
     * to a specific clinic's queue updates.
     */
    socket.on("join:clinic", (clinicId) => {
      if (!clinicId) return;
      const roomName = `clinic_${clinicId}`;
      socket.join(roomName);
      console.log(`📥 Socket ${socket.id} joined room: ${roomName}`);
    });

    /**
     * Web/Mobile app emits "leave:clinic" to unsubscribe.
     */
    socket.on("leave:clinic", (clinicId) => {
      if (!clinicId) return;
      const roomName = `clinic_${clinicId}`;
      socket.leave(roomName);
      console.log(`📤 Socket ${socket.id} left room: ${roomName}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupQueueSocket;
