import { SessionWithActivitiesResource } from '_@shared/stores/global/type';
export interface SocketData {
  userId: string;
  sessionId: string;
  socketId: string;
}
export type LiveSessionSocket = SocketData & SessionWithActivitiesResource;

export interface ServerToClientEvents {
  closeSession: () => void;
  userJoinSession: (data: SocketData[]) => void;
  removeUserSession: (sessionId: string) => void;
}

export interface ClientToServerEvents {
  joinSession: (data: SocketData, setJoinedSession: (isJoinedSession: boolean) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
