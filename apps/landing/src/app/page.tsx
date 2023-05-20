'use client';
//THIRD PARTY MODULES
import { useEffect } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
//SHARED
import { useSocketStore } from '_@shared/stores/socket/useSocketStore';

export default function Home() {
  // const { disconnectSocket, initiateSocket } = useSocketStore();

  // const { user } = useUser();
  // const { session } = useSession();
  // session?.user.getSessions().then((data) => {
  //   console.log({ session: data });
  // });

  // useEffect(() => {
  //   initiateSocket();
  //   return () => disconnectSocket();
  // }, [disconnectSocket, initiateSocket]);

  // if (!user) return 'Oops!!!';

  return (
    <main>
      <div>Main Page</div>
    </main>
  );
}
