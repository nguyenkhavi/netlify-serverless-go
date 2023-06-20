//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useMemo } from 'react';
import { nextApi } from '_@landing/utils/api';
import { ICollectionCard } from '_@landing/utils/type';
import { formatAddress } from '_@landing/utils/format';

export type CollectionCardProps = {
  view?: string;
  value: ICollectionCard;
  owner?: string;
};
export default function CollectionCard({ view, value }: CollectionCardProps) {
  const { data: dataUser } = nextApi.getUserByWallet.useQuery(
    {
      wallet: value.owner,
    },
    { enabled: !!value.owner },
  );

  const owner = useMemo(() => {
    if (dataUser?.[0]?.username) return dataUser?.[0]?.username;
    return formatAddress(value.owner);
  }, [value, dataUser]);

  if (view === 'list') return <ListView value={value} owner={owner} />;
  return <GridView value={value} owner={owner} />;
}

function GridView({ value, owner, ...props }: CollectionCardProps) {
  return (
    <Link
      href={'/marketplace/collection/' + value.address}
      className="rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]"
      {...props}
    >
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        <img
          src={value.metadata.image ? value.metadata.image : '/images/marketplace/collection.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-3 text-body3 xlg:text-body2">{value.name}</p>
      <p className="mt-2 overflow-hidden text-caption text-text-50 xlg:text-body3">
        Creator: <span className="text-text-80">@{owner}</span>
      </p>
      <hr className="my-2 h-[0.5px] border-none bg-text-10" />
      <div className="flex items-center justify-between text-caption text-text-70 xlg:text-body3">
        <span className="mr-2 w-12.5">Volume</span>
        <span>{value.volume}</span>
      </div>
    </Link>
  );
}

function ListView({ value, owner, ...props }: CollectionCardProps) {
  return (
    <Link
      href={'/marketplace/collection/' + value.address}
      className={classcat([
        'rounded-[10px] border border-[#303030] p-5 xlg:pb-5.5 xlg:pt-3.5',
        'md:flex',
      ])}
      {...props}
    >
      <div
        className={classcat([
          'mx-auto rounded-[10px] border-[.5px] border-white/[.13] md:mx-0',
          'aspect-square w-[12.5rem] shrink-0 overflow-hidden md:mr-8.75',
        ])}
      >
        <img
          src={value.metadata.image ? value.metadata.image : '/images/marketplace/collection.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center md:text-start">
        <p className="mt-2 text-h6 xlg:mt-4 xlg:text-h5-bold">{value.name}</p>
        <p className="mt-1 text-body3 text-text-60 dot-para-2">{value.metadata.description}</p>
        <p className="mt-1 text-subtitle2 text-primary">Created by: @{owner}</p>
        <div className="mt-1.5 flex items-center justify-center text-h6 text-text-100 md:justify-start md:text-h5">
          <p>
            <span className="mr-1 text-subtitle2 font-normal text-text-50">Volume</span>
            {value.volume}
          </p>
          <span className="ml-1.25 text-subtitle2 font-normal text-text-50">
            {value.metadata.symbol}
          </span>
        </div>
      </div>
    </Link>
  );
}
