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
//RELATIVE MODULES
import NoImage from '../NoImage';

type Props = {
  value: TItemCard;
};
export default function ItemStoreCard({ value }: Props) {
  const { openToast } = toastStore();
  const { user } = useAuthStore();
  const buyNowLink = user ? '/marketplace/checkout?item=' + value.listingId : '/auth/sign-in';

  return (
    <div className="flex flex-col rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]">
      <Link
        prefetch={false}
        href={`/marketplace/item/${value.listingId}`}
        className="block aspect-square overflow-hidden"
      >
        {value.item && value.item.metadata.image ? (
          <img src={value.item.metadata.image} alt="image" className="h-full w-full object-cover" />
        ) : (
          <NoImage />
        )}
      </Link>
      <Link
        prefetch={false}
        href={`/marketplace/item/${value.listingId}`}
        className="mt-3 line-clamp-2 text-body2 hover:underline"
        title={value.item ? value.item.name : ''}
      >
        {value.item?.name || ''}
      </Link>
      <span className="mb-auto mt-2 text-body3 text-text-80">{value.price}</span>
      <div className="mt-4 flex">
        <Button
          as={Link}
          href={buyNowLink}
          className={classcat(['btnmd mr-1 h-10 p-0 ow:rounded-lg'])}
        >
          Buy now
        </Button>
        <Button
          {...(!user
            ? { as: Link, href: '/auth/sign-in' }
            : { onClick: () => handleAddToCart(value, openToast) })}
          className={classcat(['h-10 border-none bg-white p-0 ow:w-12 ow:rounded-lg', 'shrink-0'])}
        >
          <CartIcon className="h-5 w-5" color="#0A0A0E" />
        </Button>
      </div>
    </div>
  );
}
