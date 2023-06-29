'use client';
//THIRD PARTY MODULES
// import dayjs from 'dayjs'
import classcat from 'classcat';
import { useParams } from 'next/navigation';
import { TCollectionStore } from '_@landing/utils/type';
import { useCallback, useEffect, useState } from 'react';
import { getDetailCollectionByAddress } from '_@landing/services';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import NoImage from '_@landing/components/NoImage';
import { SkeImage, SkeLine, SkeParagraph } from '_@landing/components/skeleton/skeleton';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';

const labelClasses = 'text-text-50 text-body2 md:text-h6';
const valueClasses = 'text-h6 md:text-h5-bold text-end';

export default function InfoSectionCollection() {
  const [data, setData] = useState<TCollectionStore['collection'] | null>(null);
  const [summary, setSummary] = useState<TCollectionStore['summary'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { db } = useIndexedDBContext();
  const { id: addressId } = useParams();

  const _getData = useCallback(() => {
    if (!db || !addressId) return;
    setIsLoading(true);
    getDetailCollectionByAddress(db, addressId)
      .then((res) => {
        setData(res.collection);
        setSummary(res.summary);
      })
      .finally(() => setIsLoading(false));
  }, [db, addressId]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <section className="relative z-0">
      <div className="relative h-50 bg-banner-bg bg-cover bg-no-repeat">
        <div className="absolute inset-0 z-10 bg-[#343434]/[.84] backdrop-blur-[28px]"></div>
      </div>
      <div
        className={classcat([
          'mx-auto -mt-18 rounded-[10px] px-6 pb-6 lg:px-15',
          'relative z-sticky w-[--content-width]  bg-secondary-200',
        ])}
      >
        <div className="mb-4 -translate-y-1/2">
          {isLoading ? (
            <SkeImage className="rounded-full ow:h-30.5 ow:w-30.5" />
          ) : data?.metadata?.image ? (
            <img
              className={classcat([
                'rounded-full border-2 border-solid border-primary',
                'h-30.5 w-30.5 object-cover',
              ])}
              src={data.metadata.image}
              alt=""
            />
          ) : (
            <div className="h-30.5 w-30.5 overflow-hidden rounded-full border-2 border-solid border-primary">
              <NoImage />
            </div>
          )}
        </div>
        <div className="-mt-15.25 justify-between lg:flex">
          {isLoading ? (
            <div>
              <SkeLine className="ow:w-50" />
              <SkeParagraph className="w-full xlg:w-100" />
              <SkeLine className="mt-6 ow:w-60" />
            </div>
          ) : (
            <div>
              <h1 className="mb-2 text-h5-bold md:text-h4">@{data?.name}</h1>
              <p className="line-clamp-3 max-w-[31.5rem] text-body3 text-text-70 md:text-body1">
                {data?.metadata.description || ''}
              </p>
              <p className="mt-4 text-body3 text-text-50 md:mt-6 md:text-body2">
                Created date:{' '}
                {/* <span className="text-text-100">{dayjs(data.dateCreated).format('MMM D, YYYY')}</span> */}
                <span className="text-text-100">{'--'}</span>
              </p>
              <Button
                className={classcat([
                  'w-max border-none bg-secondary-400',
                  'ow:w-29.25  [&>svg]:h-3.75',
                  'mt-12 lg:mt-6',
                ])}
                leadingIcon={<ShareIcon />}
              >
                <span className="text-gradient-pr">Share</span>
              </Button>
            </div>
          )}
          <ul
            className={classcat([
              'mt-4 grid gap-2 rounded-[10px] bg-secondary-300 p-4 lg:-mt-1.25 lg:p-6',
              'border border-text-10',
            ])}
          >
            {isLoading ? (
              Array(4)
                .fill(1)
                .map((_, index) => (
                  <li key={index} className="w-50 not-last:mb-4">
                    <SkeLine className="ow:mb-0" />
                  </li>
                ))
            ) : (
              <>
                <li className="grid grid-cols-[100px_1fr] gap-5">
                  <span className={labelClasses}>Floor</span>
                  <p className={valueClasses}>{data?.royalty || 0} BUSD</p>
                </li>
                <li className="grid grid-cols-[100px_1fr] gap-5">
                  <span className={labelClasses}>Volume</span>
                  <p className={valueClasses}>{summary?.volume || 0} BUSD</p>
                </li>
                <li className="grid grid-cols-[100px_1fr] gap-5">
                  <span className={labelClasses}>NFTs</span>
                  <p className={valueClasses}>{summary?.NFTs || 0}</p>
                </li>
                <li className="grid grid-cols-[100px_1fr] gap-5">
                  <span className={labelClasses}>Owners</span>
                  <p className={valueClasses}>{summary?.totalOwner || 0}</p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
