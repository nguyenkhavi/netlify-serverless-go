import { create } from 'zustand';
import io, {type Socket} from 'socket.io-client';

type State = {
  socket: Socket | null
}

type Action = {
  initiateSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<State & Action>((set) => ({
  socket: null,
  initiateSocket: () => {
    const socket = io("http://localhost:3000");
    socket.connect();
    set({ socket });
  },
  disconnectSocket: () => {
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

