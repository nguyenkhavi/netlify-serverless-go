'use client';

//THIRD PARTY MODULES
import { api } from '_@landing/utils/api';
import { useSession } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { LiveSessionSocket, SocketData } from '_@rpc/services/socket/interface';
//SHARED
import { useSocketStore } from '_@shared/stores/socket/useSocketStore';

const Profile = () => {
  const { session } = useSession();
  const { socket } = useSocketStore((state) => state);
  const { mutate: closeSession } = api.user.closeSession.useMutation({
    onSuccess: (closedSessionId) => {
      setTableData((current) => current.filter((item) => item.id !== closedSessionId));
    },
  });
  const { mutate: closeAllSession } = api.user.closeSessionAll.useMutation({
    onSuccess: () => {
      setTableData([]);
    },
  });

  const { data: userSessions } = useQuery(['getSessions'], () => session?.user.getSessions(), {
    enabled: !!session,
  });

  const [tableData, setTableData] = useState<LiveSessionSocket[]>([]);

  useEffect(() => {
    if (!socket) return;

    const onRemoveUserSession = (sessionId: string) => {
      setTableData((currentData) => currentData.filter((ls) => ls.id !== sessionId));
    };

    socket.on('removeUserSession', onRemoveUserSession);

    return () => {
      socket.off('removeUserSession', onRemoveUserSession);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !session || !userSessions) return;

    const onUserJoinSession = (liveSessions: SocketData[]) => {
      const data = liveSessions.reduce((prev: LiveSessionSocket[], liveSession) => {
        if (liveSession.sessionId === session.id) return prev;

        const liveSessionData = userSessions.find(
          (us) => us.id === liveSession.sessionId,
        ) as unknown as LiveSessionSocket;

        return [...prev, liveSessionData];
      }, []);

      setTableData(data);
    };

    socket.on('userJoinSession', onUserJoinSession);

    return () => {
      socket.off('userJoinSession', onUserJoinSession);
    };
  }, [socket, session, userSessions]);

  return (
    <div className="px-10 py-6">
      <h1>Profile</h1>
      <h2 className="my-6">Active User session</h2>

      {tableData && (
        <div>
          <div className="mb-2 flex space-x-4 [&>*]:min-w-[140px]">
            <div>Signed In</div>
            <div>Browser</div>
            <div>IP Address</div>
            <div>Location</div>
            <div>Current</div>
          </div>
          {tableData.map((item) => (
            <div key={item.id} className="flex space-x-4 [&>*]:min-w-[140px]">
              <div>{new Date(item.lastActiveAt).toLocaleDateString()}</div>
              <div>{item.latestActivity.browserName}</div>
              <div>{item.latestActivity.ipAddress}</div>
              <div>{item.latestActivity.city}</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  closeSession({
                    socketId: item.socketId,
                    sessionId: item.sessionId,
                  });
                }}
              >
                Close session
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              if (session)
                closeAllSession({
                  userId: session.user.id,
                  currentSessionId: session.id,
                });
            }}
          >
            Close all session
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
