import { IO, SocketClient } from './socket';

export const userJoinSession = (io: IO, socket: SocketClient) => {
  socket.on('joinSession', async (session, setJoinedSession) => {
    socket.data = { ...session, socketId: socket.id };

    await socket.join(session.userId);
    setJoinedSession(true);

    const socketSessionUsers = await io.in(session.userId).fetchSockets();
    const sessions = socketSessionUsers.map((item) => item.data);

    io.to(session.userId).emit('userJoinSession', sessions);
  });
};

export const disconnect = (io: IO, socket: SocketClient) => {
  socket.on('disconnect', () => {
    console.log(`client ${socket.id} disconnected`);

    const userId = socket.data.userId;
    const sessionId = socket.data.sessionId;

    if (userId && sessionId) socket.to(userId).emit('removeUserSession', sessionId);
  });
};
