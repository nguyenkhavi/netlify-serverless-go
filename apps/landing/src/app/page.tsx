'use client';

import { useUser, useSession } from '@clerk/nextjs';
import InstagramConnectButton from '_@landing/components/provider/InstagramConnectButton';
import KYCButton from '_@landing/components/provider/KYCButton';
import { useSocketStore } from '_@shared/stores/socket/useSocketStore';
import { useEffect } from 'react';

export default function Home() {
  const { disconnectSocket, initiateSocket } = useSocketStore();

  const { user } = useUser();
  const { session } = useSession();
  session?.user.getSessions().then((data) => {
    console.log({ session: data });
  });

  useEffect(() => {
    initiateSocket();

    return () => disconnectSocket();
  }, [disconnectSocket, initiateSocket]);

  if (!user) return 'Opps!!!';

  return (
    <main className="relative before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[url('/images/background-footer-light.png')] before:bg-top before:bg-repeat before:opacity-20 before:mix-blend-overlay">
      <KYCButton />
      <InstagramConnectButton />
    </main>
  );
}
