//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
import Ellipse from './comps/Ellipse';
import ClientsSection from './comps/ClientsSection';
import WelcomeSection from './comps/WelcomeSection';
import ExchangeSection from './comps/ExchangeSection';
import PartnersSection from './comps/PartnersSection';
import HomeAdvHorizontal from './comps/HomeAdvHorizontal';
import MarketplaceSection from './comps/MarketplaceSection';
import AchievementsSection from './comps/AchievementsSection';
import SocialNetworkSection from './comps/SocialNetworkSection';
import FinanceVenturesSection from './comps/FinanceVenturesSection';

export default function Home() {
  return (
    <main
      className={classcat([
        'relative overflow-hidden',
        'grid gap-10 px-[--px] pb-10 pt-6',
        'xlg:gap-20 xlg:pb-[110px] xlg:pt-7',
        '2xl:pb-[235px]',
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
      <ClientsSection />
      <PartnersSection />
      <HomeAdvHorizontal className="2xl:ow:hidden" />
    </main>
  );
}
