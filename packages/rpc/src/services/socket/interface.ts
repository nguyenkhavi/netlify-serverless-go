export interface SessionActivity {
  id: string;
  browserName?: string;
  browserVersion?: string;
  deviceType?: string;
  ipAddress?: string;
  city?: string;
  country?: string;
  isMobile?: boolean;
}

export interface SessionWithActivitiesResource {
  id: string;
  status: string;
  expireAt: Date;
  abandonAt: Date;
  lastActiveAt: Date;
  latestActivity: SessionActivity;
}
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
