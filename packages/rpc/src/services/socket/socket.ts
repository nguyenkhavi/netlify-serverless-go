import { disconnect, userJoinSession } from './event';
import { Server, Socket } from 'socket.io';
import { RawServerDefault } from 'fastify';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface';

export type IO = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type SocketClient = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

let io: IO;

export const initSocket = (server: RawServerDefault) => {
  io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`);

    userJoinSession(io, socket);

    disconnect(io, socket);
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO is not initialized.');
  }

  return io;
};
