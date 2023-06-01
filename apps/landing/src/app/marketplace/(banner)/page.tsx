'use client';
//THIRD PARTY MODULES
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import TopSellers from '_@landing/app/marketplace/comps/TopSellers';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import TrendingInPFP from '_@landing/app/marketplace/comps/TrendingInPFP';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
import TrendingInArts from '_@landing/app/marketplace/comps/TrendingInArts';
import TrendingInGaming from '_@landing/app/marketplace/comps/TrendingInGaming';
import TrendingInNature from '_@landing/app/marketplace/comps/TrendingInNature';
import TrendingInWildlife from '_@landing/app/marketplace/comps/TrendingInWildlife';
//HOOK
import { useSalAnim } from '_@landing/hooks/useSalAnim';

export default function Marketplace() {
  useSalAnim();

  return (
    <MarketplaceBox
      leftContent={
        <HomeAdvVertical
          className="relative h-auto w-full py-8 xl:grid"
          btnClasses="ow:static mt-6.25"
        />
      }
    >
      <TopSellers />
      <TrendingInArts />
      <HomeAdvHorizontal isHome={false} />
      <TrendingInPFP />
      <TrendingInWildlife />
      <HomeAdvHorizontal isHome={false} />
      <TrendingInNature />
      <TrendingInGaming />
      <HomeAdvHorizontal isHome={false} />
    </MarketplaceBox>
  );
}
