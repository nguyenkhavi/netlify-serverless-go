'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { TItemCard } from '_@landing/utils/type';
import { handleAddToCart } from '_@landing/utils/NFTItem';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import CartIcon from '_@shared/icons/CartIcon';
import { toastStore } from '_@shared/stores/toast/toastStore';
//HOOK
import { useGetOwnerByWallet } from '_@landing/hooks/useGetOwnerByWallet';

export type TViewMainCard = 'grid' | 'list' | 'grid-only';

export type MainCardProps = {
  view?: TViewMainCard;
  value: TItemCard;
};

export default function MainCard({ view = 'grid', value, ...props }: MainCardProps) {
  if (view === 'list') return <ListView value={value} {...props} />;
  if (view === 'grid-only') return <GridViewOnly value={value} {...props} />;
  return <GridViewWithBuy value={value} {...props} />;
}

function GridViewWithBuy({ value, ...props }: MainCardProps) {
  const { openToast } = toastStore();
  const { user } = useAuthStore();
  const buyNowLink = user ? '/marketplace/checkout?item=' + value.listingId : '/auth/sign-in';

  return (
    <div className="rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]" {...props}>
      <div className="aspect-square overflow-hidden">
        <img
          src={value.item ? value.item.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <Link
        href={`/marketplace/item/${value.listingId}`}
        className="mt-3 block text-body2 hover:underline"
      >
        {value.item ? value.item.name : '-'}
      </Link>
      <span className="mt-2 text-body3 text-text-80">{`${value.price} ${
        value.token?.symbol || ''
      }`}</span>
      {!user || user.profile.wallet !== value.item.owner ? (
        <div className="mt-4 flex">
          <Button
            as={Link}
            href={buyNowLink}
            className={classcat(['btnmd mr-1 h-10 p-0 ow:rounded-lg'])}
          >
            Buy now
          </Button>
          <Button
            className={classcat([
              'h-10 border-none bg-white p-0 ow:w-12 ow:rounded-lg',
              'shrink-0',
            ])}
            {...(!user
              ? { as: Link, href: '/auth/sign-in' }
              : { onClick: () => handleAddToCart(value, openToast) })}
          >
            <CartIcon className="h-5 w-5" color="#0A0A0E" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function ListView({ value, ...props }: MainCardProps) {
  const { openToast } = toastStore();
  const { user } = useAuthStore();
  const { owner } = useGetOwnerByWallet(value.item.owner);
  const buyNowLink = user ? '/marketplace/checkout?item=' + value.listingId : '/auth/sign-in';

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
          'mx-auto h-50 w-50 md:mx-0 md:h-51 md:w-51',
          'aspect-square shrink-0 overflow-hidden md:mr-8',
        ])}
      >
        <img
          src={value.item ? value.item.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grow text-center md:text-start">
        <Link
          href={`/marketplace/item/${value.listingId}`}
          className="mt-4 block text-body2 hover:underline md:mt-0 xlg:text-h5-bold"
        >
          {value.item ? value.item.name : ''}
        </Link>
        <p className="mt-1 line-clamp-2 text-body3 text-text-60">
          {value.item ? value.item.metadata.description : ''}
        </p>
        <div className="mt-1 flex items-center justify-center text-h6 text-text-100 md:justify-start md:text-h5">
          <span>{`${value.price} ${value.token?.symbol || ''}`}</span>
          <span className="ml-1.25 text-subtitle2 text-text-50">{`$${value.price}`}</span>
        </div>
        <p className="mt-1 text-subtitle2 text-primary">By {owner}</p>
        <div className="mt-4 flex justify-center md:justify-start">
          <Button
            as={Link}
            href={buyNowLink}
            className={classcat(['mr-1 h-10 p-0 ow:rounded-lg md:max-w-[9.375rem]'])}
          >
            Buy now
          </Button>
          <Button
            className={classcat([
              'h-10 border-none bg-white p-0 ow:w-12 ow:rounded-lg',
              'shrink-0',
            ])}
            {...(!user
              ? { as: Link, href: '/auth/sign-in' }
              : { onClick: () => handleAddToCart(value, openToast) })}
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
