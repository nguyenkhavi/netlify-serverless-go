//THIRD PARTY MODULES
import classcat from 'classcat';
import { MOCK_DATA_ITEM } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import MainCard, { type TViewMainCard } from '_@landing/components/card/MainCard';

type IPropsComp = {
  view: TViewMainCard;
};

const gridViewClasses = ['grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-4'];
const listViewClasses = ['gap-4'];

export default function TabContentArtItems({ view }: IPropsComp) {
  return (
    <div>
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : listViewClasses])}>
        {MOCK_DATA_ITEM.map((item, index) => (
          <MainCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-6 md:my-10" isHome={false} />
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : listViewClasses])}>
        {MOCK_DATA_ITEM.map((item, index) => (
          <MainCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-6 md:my-10" isHome={false} />
    </div>
  );
}
