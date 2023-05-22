'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
// import { useEffect } from 'react'
// import { useSession, useUser } from '@clerk/nextjs'
// import { useSocketStore } from '_@shared/stores/socket/useSocketStore'
import Ellipse from './comps/Ellipse';
import WelcomeSection from './comps/WelcomeSection';
import ExchangeSection from './comps/ExchangeSection';
import HomeAdvHorizontal from './comps/HomeAdvHorizontal';
import MarketplaceSection from './comps/MarketplaceSection';
import SocialNetworkSection from './comps/SocialNetworkSection';
import FinanceVenturesSection from './comps/FinanceVenturesSection';

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
    <main
      className={classcat([
        'relative overflow-hidden',
        'grid gap-7.5 px-[--px] pb-7.5 pt-10',
        'xlg:gap-20 xlg:pb-[110px] xlg:pt-7',
      ])}
    >
      <Ellipse />
      <WelcomeSection />
      <MarketplaceSection />
      <HomeAdvHorizontal />
      <ExchangeSection />
      <HomeAdvHorizontal />
      <SocialNetworkSection />
      <HomeAdvHorizontal />
      <FinanceVenturesSection />
      <HomeAdvHorizontal />
    </main>
  );
}
