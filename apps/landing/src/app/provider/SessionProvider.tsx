// 'use client';
// //THIRD PARTY MODULES
// import React from 'react';
// import { useEffect } from 'react';
// import { useSession } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// //SHARED
// import { useSocketStore } from '_@shared/stores/socket/useSocketStore';

// const SessionProvider = ({ children }: { children: any }) => {
//   const { session } = useSession();
//   const { push } = useRouter();
//   const { disconnectSocket, socket, setJoinedSession } = useSocketStore((state) => state);
//   const { data: userSessions } = useQuery(['getSessions'], () => session?.user.getSessions(), {
//     enabled: !!session,
//   });

//   useEffect(() => {
//     if (!socket || !session || !userSessions) return;

//     socket.emit(
//       'joinSession',
//       { userId: session.user.id, sessionId: session.id, socketId: socket.id },
//       setJoinedSession,
//     );

//     socket.on('closeSession', () => {
//       // FE need to implement more logic when user close session

//       push('/');
//     });

//     return () => {
//       setJoinedSession(false);
//       socket.off('closeSession', () => {
//         push('/');
//       });
//     };
//   }, [socket, session, userSessions, setJoinedSession, push, disconnectSocket]);

//   return <>{children}</>;
// };

// export default SessionProvider;

export {};
