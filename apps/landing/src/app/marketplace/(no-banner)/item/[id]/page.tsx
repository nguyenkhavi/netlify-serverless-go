//THIRD PARTY MODULES
import classcat from 'classcat';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import ItemHistory from './components/ItemHistory';
import NFTInfoCard from './components/NFTInfoCard';
import ItemImageCard from './components/ItemImageCard';
import StreamChat from './components/stream/StreamChat';
import RecentlyViewed from './components/RecentlyViewed';
import ItemDescriptionCard from './components/ItemDescriptionCard';
//SHARED
function Page() {
  return (
    <div className="grid grid-flow-row gap-6 px-[--px] pb-9 pt-6 md:gap-22 md:pb-26.5">
      <div className={classcat(['grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr]'])}>
        <ItemImageCard />
        <ItemDescriptionCard />
      </div>
      <div
        className={classcat([
          'grid grid-cols-1 gap-8 md:grid-cols-[1fr_min(theme(spacing[173.5]),55%)]',
          'md:gap-8',
        ])}
      >
        <div className="grid grid-flow-row gap-5 md:gap-8">
          <NFTInfoCard />
          <ItemHistory />
        </div>
        <StreamChat />
      </div>
      <HomeAdvHorizontal />
      <RecentlyViewed />
    </div>
  );
}
export default Page;
