//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { IItemCard } from '_@landing/utils/type';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import CartIcon from '_@shared/icons/CartIcon';

export type TViewMainCard = 'grid' | 'list' | 'grid-only';

export type MainCardProps = {
  view?: TViewMainCard;
  value: IItemCard;
};

export default function MainCard({ view = 'grid', value, ...props }: MainCardProps) {
  if (view === 'list') return <ListView value={value} {...props} />;
  if (view === 'grid-only') return <GridViewOnly value={value} {...props} />;
  return <GridViewWithBuy value={value} {...props} />;
}

function GridViewWithBuy({ value, ...props }: MainCardProps) {
  return (
    <div className="rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]" {...props}>
      <div className="aspect-square overflow-hidden">
        <img
          src={value.item ? value.item.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-3 text-body2">{value.item ? value.item.name : '-'}</p>
      <span className="mt-2 text-body3 text-text-80">{value.price}</span>
      <div className="mt-4 flex">
        <Button className={classcat(['btnmd mr-1 h-10 p-0 ow:rounded-lg'])}>Buy now</Button>
        <Button
          as={Link}
          href={`/marketplace/item/${value.listingId}`}
          className={classcat(['h-10 border-none bg-white p-0 ow:w-12 ow:rounded-lg', 'shrink-0'])}
        >
          <CartIcon className="h-5 w-5" color="#0A0A0E" />
        </Button>
      </div>
    </div>
  );
}

function ListView({ value, ...props }: MainCardProps) {
  return (
    <div
      className={classcat([
        'rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]',
        'md:flex',
      ])}
      {...props}
    >
      <div
        className={classcat([
          'mx-auto md:mx-0',
          'aspect-square max-w-[12.5rem] shrink-0 overflow-hidden md:mr-8.75',
        ])}
      >
        <img
          src={value.item ? value.item.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grow text-center md:text-start">
        <p className="mt-4 text-body2 md:mt-0 xlg:text-h5-bold">
          {value.item ? value.item.name : ''}
        </p>
        <p className="mt-1 text-body3 text-text-60">
          {value.item ? value.item.metadata.description : ''}
        </p>
        <div className="mt-1 flex items-center justify-center text-h6 text-text-100 md:justify-start md:text-h5">
          <span>{value.price} </span>
          <span className="ml-1.25 text-subtitle2 text-text-50">{value.price}</span>
        </div>
        <p className="mt-1 text-subtitle2 text-primary">By {value.item ? value.item.owner : ''}</p>
        <div className="mt-4 flex justify-center md:justify-start">
          <Button className={classcat(['mr-1 h-10 p-0 ow:rounded-lg md:max-w-[9.375rem]'])}>
            Buy now
          </Button>
          <Button
            as={Link}
            href={`/marketplace/item/${value.listingId}`}
            className={classcat([
              'h-10 border-none bg-white p-0 ow:w-12 ow:rounded-lg',
              'shrink-0',
            ])}
          >
            <CartIcon className="h-5 w-5" color="#0A0A0E" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function GridViewOnly({ value, ...props }: MainCardProps) {
  return (
    <div
      className="rounded-[10px] border border-[#303030] px-2.25 py-3.75 xlg:px-3.75 xlg:py-5"
      {...props}
    >
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        <img
          src={value.item ? value.item.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-1.25 text-body3 xlg:mt-4 xlg:text-body2">
        {value.item ? value.item.name : ''}
      </p>
      <p className="text-caption text-text-50 xlg:text-body3">
        Creator: <span className="text-text-80">@{value.listingCreator}</span>
      </p>
      <hr className="my-1.25 h-[0.5px] border-none bg-text-10" />
      <div className="flex items-center justify-between text-caption text-text-70 xlg:text-body3">
        <span>Price</span>
        <span>{value.price}</span>
      </div>
    </div>
  );
}
