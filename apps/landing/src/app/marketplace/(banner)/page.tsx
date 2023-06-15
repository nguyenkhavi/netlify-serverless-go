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
//RELATIVE MODULES
import BrowseCategory from '../comps/BrowseCategory';

export default function Marketplace() {
  useSalAnim();

  return (
    <MarketplaceBox
      leftContent={
        <>
          <BrowseCategory />
          <HomeAdvVertical
            className="relative h-auto w-full py-8 ow:top-6 ow:px-15 xl:grid"
            btnClasses="ow:static mt-6.25"
          />
        </>
      }
    >
      <TopSellers />
      <TrendingInArts />
      <HomeAdvHorizontal className="w-[--content-width] md:w-auto" isHome={false} />
      <TrendingInPFP />
      <TrendingInWildlife />
      <HomeAdvHorizontal className="w-[--content-width] md:w-auto" isHome={false} />
      <TrendingInNature />
      <TrendingInGaming />
      <HomeAdvHorizontal className="w-[--content-width] md:w-auto" isHome={false} />
    </MarketplaceBox>
  );
}
