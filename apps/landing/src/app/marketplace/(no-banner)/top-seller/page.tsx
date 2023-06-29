'use client';
//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import SellerCard from '_@landing/components/card/SellerCard';
import { SkeCard } from '_@landing/components/skeleton/skeleton';
import ContentWithBack from '_@landing/components/content-box/ContentWithBack';
//SHARED

export default function TopSellerPage() {
  const { bestSeller } = useIndexedDBContext();
  return (
    <ContentWithBack title="Top Sellers" path="/marketplace">
      {bestSeller.loading
        ? Array(8)
            .fill(1)
            .map((item, index) => <SkeCard key={index} />)
        : bestSeller.data.map((item, index) => (
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
