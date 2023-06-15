//THIRD PARTY MODULES
import classcat from 'classcat';
import { MOCK_DATA_COLLECTION } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import CollectionCard from '_@landing/components/card/CollectionCard';

const gridViewClasses = ['grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-4'];

export default function TabContentCollection({ view }: { view: string }) {
  return (
    <div>
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : ''])}>
        {MOCK_DATA_COLLECTION.map((item, index) => (
          <CollectionCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-6 md:my-10" isHome={false} />
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : ''])}>
        {MOCK_DATA_COLLECTION.map((item, index) => (
          <CollectionCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-6 md:my-10" isHome={false} />
    </div>
  );
}
