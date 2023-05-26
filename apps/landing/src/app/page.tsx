'use client';
//THIRD PARTY MODULES
import sal from 'sal.js'
import 'sal.js/dist/sal.css'
import classcat from 'classcat'
//RELATIVE MODULES
import Ellipse from './comps/Ellipse'
import ClientsSection from './comps/ClientsSection'
import WelcomeSection from './comps/WelcomeSection'
import ExchangeSection from './comps/ExchangeSection'
import PartnersSection from './comps/PartnersSection'
import HomeAdvHorizontal from './comps/HomeAdvHorizontal'
import MarketplaceSection from './comps/MarketplaceSection'
import AchievementsSection from './comps/AchievementsSection'
import SocialNetworkSection from './comps/SocialNetworkSection'
import FinanceVenturesSection from './comps/FinanceVenturesSection'

export default function Home() {
  sal();
  return (
    <main
      className={classcat([
        'relative overflow-hidden',
        'grid gap-7.5 px-[--px] pb-7.5 pt-10',
        'xlg:gap-20 xlg:pb-[110px] xlg:pt-7',
        '2xl:pb-[304px]',
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
      <AchievementsSection />
      <HomeAdvHorizontal />
      <ClientsSection />
      <PartnersSection />
      <HomeAdvHorizontal className="2xl:ow:hidden" />
    </main>
  );
}
