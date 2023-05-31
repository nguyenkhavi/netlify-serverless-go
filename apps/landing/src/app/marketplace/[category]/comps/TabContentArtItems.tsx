//THIRD PARTY MODULES
import classcat from 'classcat';
import { MOCK_DATA_ITEM } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import MainCard from '_@landing/components/card/MainCard';
import BasePagination from '_@shared/components/pagination/BasePagination';

type IPropsComp = {
  view: string;
};

const gridViewClasses = ['grid-cols-2 md:grid-cols-4 gap-x-3.25 gap-y-5 md:gap-7'];
const listViewClasses = ['gap-x-3.25 gap-y-4.5'];

export default function TabContentArtItems({ view }: IPropsComp) {
  return (
    <div>
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : listViewClasses])}>
        {MOCK_DATA_ITEM.map((item, index) => (
          <MainCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-5 md:my-6" isHome={false} />
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : listViewClasses])}>
        {MOCK_DATA_ITEM.map((item, index) => (
          <MainCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-5 md:my-6" isHome={false} />
    </div>
  );
}
