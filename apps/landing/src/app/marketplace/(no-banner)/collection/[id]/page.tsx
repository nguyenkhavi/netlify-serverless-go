//THIRD PARTY MODULES
import classcat from 'classcat';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
//LAYOUT, COMPONENTS
import ContentItems from './components/ContentItems';
import InfoSectionCollection from './components/InfoSectionCollection';
//RELATIVE MODULES
import FilterBar from '../../comps/FilterBar';

export default function SellerPage() {
  return (
    <>
      <InfoSectionCollection />
      <FilterBar showOptionsLeft={false} />

      <div className="flex px-[--px] py-6 xlg:pb-24 xlg:pt-8">
        <div className="hidden w-[284px] shrink-0 xlg:block">
          <FilterPrice className="ow:mt-0" />
          <HomeAdvVertical
            className="relative mt-7.5 h-auto w-full py-8 ow:top-0 xlg:grid"
            btnClasses="ow:static mt-6.25"
          />
        </div>
        <div className={classcat(['relative grid h-max grow gap-6.25 xlg:ml-8'])}>
          <ContentItems />
        </div>
      </div>
    </>
  );
}
