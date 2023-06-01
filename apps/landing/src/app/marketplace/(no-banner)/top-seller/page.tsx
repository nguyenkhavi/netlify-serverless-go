'use client';
//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { MOCK_DATA_SELLER } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import SellerCard from '_@landing/components/card/SellerCard';
import ContentWithBack from '_@landing/components/content-box/ContentWithBack';
//SHARED

export default function TopSellerPage() {
  return (
    <ContentWithBack title="Top Sellers" path="/marketplace">
      {MOCK_DATA_SELLER.map((item, index) => (
        <React.Fragment key={index}>
          <SellerCard value={item} view="full" />
          {(index + 1) % 4 === 0 ? (
            <HomeAdvHorizontal
              className={classcat(['col-span-full', index + 1 === 4 ? 'md:hidden' : ''])}
              isHome={false}
            />
          ) : null}
        </React.Fragment>
      ))}
    </ContentWithBack>
  );
}
