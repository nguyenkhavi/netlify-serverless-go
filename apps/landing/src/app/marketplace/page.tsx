//RELATIVE MODULES
import TopSellers from './comps/TopSellers';
import TrendingInPFP from './comps/TrendingInPFP';
import MarketplaceBox from './comps/MarketplaceBox';
import TrendingInArts from './comps/TrendingInArts';
import TrendingInGaming from './comps/TrendingInGaming';
import TrendingInNature from './comps/TrendingInNature';
import HomeAdvHorizontal from '../comps/HomeAdvHorizontal';
import TrendingInWildlife from './comps/TrendingInWildlife';

export default function Marketplace() {
  return (
    <MarketplaceBox>
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
