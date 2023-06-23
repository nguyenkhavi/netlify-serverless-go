//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { TItemStore } from '_@landing/utils/type';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import CartIcon from '_@shared/icons/CartIcon';

type Props = {
  value: TItemStore[number];
};
export default function ItemStoreCard({ value }: Props) {
  console.log(value);
  return (
    <div className="rounded-[10px] p-4 ring-1 ring-text-20 ring-offset-[-0.5px]">
      <div className="aspect-square overflow-hidden">
        <img
          src={value.metadata.image ? value.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-3 text-body2">{value.name}</p>
      <span className="mt-2 text-body3 text-text-80">{value.market?.[0].price}</span>
      <div className="mt-4 flex">
        <Button className={classcat(['btnmd mr-1 h-10 p-0 ow:rounded-lg'])}>Buy now</Button>
        <Button
          as={Link}
          href={`/marketplace/item/${value.market?.[0].listingId}`}
          className={classcat(['h-10 border-none bg-white p-0 ow:w-12 ow:rounded-lg', 'shrink-0'])}
        >
          <CartIcon className="h-5 w-5" color="#0A0A0E" />
        </Button>
      </div>
    </div>
  );
}
