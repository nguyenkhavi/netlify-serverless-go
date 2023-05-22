'use client';
//THIRD PARTY MODULES
// import classcat from 'classcat';
// import { useEffect } from 'react';
// import { useSession, useUser } from '@clerk/nextjs';
//SHARED
// import { useSocketStore } from '_@shared/stores/socket/useSocketStore';
//RELATIVE MODULES
import Ellipse from './comps/Ellipse';
import WelcomeSection from './comps/WelcomeSection';

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
    <main className="relative px-[--px] pb-7.5 pt-10">
      <Ellipse />
      <WelcomeSection />
    </main>
  );
}
