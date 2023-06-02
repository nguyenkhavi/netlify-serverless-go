'use client';
//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { MOCK_DATA_ITEM } from '_@landing/mock/Item';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
import MarketplaceBox from '_@landing/app/marketplace/comps/MarketplaceBox';
//LAYOUT, COMPONENTS
import MainCard from '_@landing/components/card/MainCard';
import BasePagination from '_@shared/components/pagination/BasePagination';
//RELATIVE MODULES
import FilterBar from '../../comps/FilterBar';
import InfoSection from '../../comps/InfoSection';
//RELATIVE MODULES

const DATA_COLLECTION = {
  name: 'Golden Hand',
  image: '/images/marketplace/banner-1.jpeg',
  description:
    'Design amazing digital experiences that create more happy in the world.design amazing digital experiences that create more happy in the world.',
  createdAt: '2021-08-20T07:00:00.000Z',
};

export default function SellerPage() {
  return (
    <>
      <InfoSection
        data={DATA_COLLECTION}
        isCollection={true}
        contentClasses="ow:px-4 ow:md:px-12.5"
      />
      <FilterBar showOptionsLeft={false} />

      <MarketplaceBox
        leftContent={
          <>
            <FilterPrice className="ow:mt-0" />
            <HomeAdvVertical
              className="relative mt-7.5 h-auto w-full py-8 ow:top-0 xl:grid"
              btnClasses="ow:static mt-6.25"
            />
          </>
        }
      >
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-x-7.5 xlg:gap-y-5">
          {MOCK_DATA_ITEM.map((item, index) => (
            <React.Fragment key={index}>
              <MainCard value={item} />
              {(index + 1) % 4 === 0 ? (
                <HomeAdvHorizontal
                  className={classcat(['col-span-full', (index + 1) % 8 === 0 ? '' : 'md:hidden'])}
                  isHome={false}
                />
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center">
          <BasePagination perPage={1} totalItems={20} />
        </div>
      </MarketplaceBox>
    </>
  );
}
