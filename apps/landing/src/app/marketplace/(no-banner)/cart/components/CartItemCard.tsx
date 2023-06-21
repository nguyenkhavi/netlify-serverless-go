//THIRD PARTY MODULES
import classcat from 'classcat';
import { TItemCard } from '_@landing/utils/type';
//SHARED
import TrashCanIcon from '_@shared/icons/TrashCanIcon';
//HOOK
import { useGetOwnerByWallet } from '_@landing/hooks/useGetOwnerByWallet';

type Props = {
  value: TItemCard;
  onClickRemove?: (listingId: number) => void;
};
export default function CartItemCard({ value, onClickRemove }: Props) {
  const { owner } = useGetOwnerByWallet(value.item.owner);

  return (
    <div
      className={classcat([
        'rounded-[10px] border border-text-20 p-4',
        'xlg:grid xlg:grid-cols-[200px_1fr_38px] xlg:gap-8',
      ])}
    >
      <div className="mx-auto h-50 w-50 overflow-hidden rounded-[10px] border border-text-10 xlg:border-none">
        <img
          src={value.item ? value.item.metadata.image : '/images/marketplace/trending.png'}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 grid h-max gap-1 text-center xlg:mt-0 xlg:text-left">
        <p className="text-body2 xlg:text-h5-bold">{value.item ? value.item.name : ''}</p>
        <p className="text-body3 text-text-60">
          {value.item ? value.item.metadata.description : ''}
        </p>
        <p className="text-subtitle2 text-primary">By {owner}</p>
        <div className="flex items-center justify-center xlg:justify-start">
          <p className="text-h5">
            <span className="text-body3 text-text-60 xlg:hidden">Volume</span>{' '}
            {`${value.price} ${value.token.symbol}`}
          </p>
          <span className="ml-1.25 text-text-60">${value.price}</span>
        </div>
      </div>
      <div className="mt-6 flex justify-center xlg:mt-0 xlg:items-center">
        <button
          className="grid h-9.5 w-9.5 place-items-center rounded-full bg-black hover:drop-shadow-btn"
          onClick={() => {
            if (onClickRemove) onClickRemove(value.listingId);
          }}
        >
          <TrashCanIcon />
        </button>
      </div>
    </div>
  );
}
