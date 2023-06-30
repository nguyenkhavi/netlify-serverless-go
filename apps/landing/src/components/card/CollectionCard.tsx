//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { cloneElement } from 'react';
import { TCollectionCard } from '_@landing/utils/type';
//HOOK
import { useGetOwnerByWallet } from '_@landing/hooks/useGetOwnerByWallet';
//RELATIVE MODULES
import NoImage from '../NoImage';

export type CollectionCardProps = {
  view?: string;
  value: TCollectionCard;
  owner?: string;
  isMyItem?: boolean;
  className?: string;
};
export default function CollectionCard({
  view,
  value,
  isMyItem = false,
  className,
}: CollectionCardProps) {
  const { owner } = useGetOwnerByWallet(value.owner);

  if (view === 'list')
    return <ListView value={value} owner={owner} isMyItem={isMyItem} className={className} />;
  return <GridView value={value} owner={owner} isMyItem={isMyItem} className={className} />;
}

function GridView({ value, owner, isMyItem = false, className, ...props }: CollectionCardProps) {
  const Tag = renderElementTag(isMyItem, value.address);
  return cloneElement(
    Tag,
    {
      className: classcat(['rounded-[10px] border border-text-10 p-4', className]),
      ...props,
    },
    <>
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        {value.metadata.image && value.metadata.image ? (
          <img src={value.metadata.image} alt="image" className="h-full w-full object-cover" />
        ) : (
          <NoImage />
        )}
      </div>
      <p className="mt-3 line-clamp-1 text-body3 xlg:text-body2">{value.name}</p>
      <p className="mt-2 overflow-hidden text-caption text-text-50 xlg:text-body3">
        Creator: <span className="text-text-80">@{owner}</span>
      </p>
      <hr className="my-2 h-[0.5px] border-none bg-text-10" />
      <div className="flex items-center justify-between text-caption text-text-70 xlg:text-body3">
        <span className="mr-2 w-12.5">Volume</span>
        <span>{value.volume} BUSD</span>
      </div>
    </>,
  );
}

function ListView({ value, owner, isMyItem = false, className, ...props }: CollectionCardProps) {
  const Tag = renderElementTag(isMyItem, value.address);

  return cloneElement(
    Tag,
    {
      className: classcat([
        'rounded-[10px] border border-[#303030] p-5 xlg:pb-5.5 xlg:pt-3.5',
        'md:flex',
      ]),
      ...props,
    },
    <>
      <div
        className={classcat([
          'mx-auto rounded-[10px] border-[.5px] border-white/[.13] md:mx-0',
          'aspect-square w-[12.5rem] shrink-0 overflow-hidden md:mr-8.75',
          className,
        ])}
      >
        {value.metadata.image && value.metadata.image ? (
          <img src={value.metadata.image} alt="image" className="h-full w-full object-cover" />
        ) : (
          <NoImage />
        )}
      </div>
      <div className="text-center md:text-start">
        <p className="mt-2 line-clamp-1 text-h6 xlg:mt-4 xlg:text-h5-bold">{value.name}</p>
        <p className="mt-1 line-clamp-2 text-body3 text-text-60">{value.metadata.description}</p>
        <p className="mt-1 text-subtitle2 text-primary">Created by: @{owner}</p>
        <div className="mt-1.5 flex items-center justify-center text-h6 text-text-100 md:justify-start md:text-h5">
          <p>
            <span className="mr-1 text-subtitle2 font-normal text-text-50">Volume</span>
            {value.volume}
          </p>
          <span className="ml-1.25 text-subtitle2 font-normal text-text-50">${value.volume}</span>
        </div>
      </div>
    </>,
  );
}

function renderElementTag(isMyItem: boolean, address: string) {
  if (isMyItem) return <div></div>;
  return <Link prefetch={false} href={'/marketplace/collection/' + address}></Link>;
}
