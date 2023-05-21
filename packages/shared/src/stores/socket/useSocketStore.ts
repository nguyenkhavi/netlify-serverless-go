//THIRD PARTY MODULES
import { create } from 'zustand';
import io, { type Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '_@rpc/services/socket/interface';

type State = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isJoinedSession: boolean;
};

type Action = {
  disconnectSocket: () => void;
  setJoinedSession: (isJoined: boolean) => void;
};

if (!process.env.NEXT_PUBLIC_TRPC_URL) throw new Error('NEXT_PUBLIC_TRPC_URL need define in env');

const socket = io(process.env.NEXT_PUBLIC_TRPC_URL);

export const useSocketStore = create<State & Action>((set) => ({
  socket,
  isJoinedSession: false,
  disconnectSocket: () => {
    const { socket } = useSocketStore.getState();

    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
  setJoinedSession: (isJoinedSession: boolean) => {
    set({ isJoinedSession });
  },
}));
