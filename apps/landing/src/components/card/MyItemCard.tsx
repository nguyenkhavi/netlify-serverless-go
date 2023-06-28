//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { TItemStore } from '_@landing/utils/type';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import ThreeDotIcon from '_@shared/icons/ThreeDotIcon';
//RELATIVE MODULES
import BurnNFT from '../item-action-content/BurnNFT';
import DelistNFT from '../item-action-content/DelistNFT';
import TransferNFT from '../item-action-content/TransferNFT';
import ChangePrice from '../item-action-content/ChangePrice';
import ConfirmAddress from '../item-action-content/ConfirmAddress';

type Props = {
  value: TItemStore[number];
};

export default function MyItemCard({ value }: Props) {
  const { user } = useAuthStore();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="rounded-[10px] border border-[#303030] p-4">
      <div className="aspect-square overflow-hidden rounded-[10px] border-[.5px] border-white/[.13]">
        <img
          src={value.metadata.image ? value.metadata.image : '/images/marketplace/trending.png'}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-body3 xlg:text-body2">{value.name}</p>
        <Popover open={openPopup} onOpenChange={(open) => setOpenPopup(open)}>
          <PopoverTrigger className="ow:px-0 ow:py-2">
            <div className="hover:bg-secondary-400">
              <ThreeDotIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="rounded ow:px-2.5 ow:py-2">
            <ContentOption isListing={value.market.length > 0} />
          </PopoverContent>
        </Popover>
      </div>
      <p
        className="mt-2 overflow-hidden text-caption text-text-50 xlg:text-body3"
        title={user?.profile.username}
      >
        Creator: <span className="text-text-80">@{user?.profile.username}</span>
      </p>
      <hr className="my-2 h-[0.5px] border-none bg-text-10" />
      <div className="flex items-center justify-between text-caption text-text-70 xlg:text-body3">
        <span>{value.market.length > 0 ? 'Price' : 'Not Listed'}</span>

        {value.market.length > 0 ? (
          <span>{`${value.market[0].price} ${value.market[0].token.symbol}`}</span>
        ) : null}
      </div>
    </div>
  );
}

type ContentOptionProps = {
  isListing: boolean;
};
function ContentOption({ isListing }: ContentOptionProps) {
  const { openDialog } = dialogMyItemCardStore();

  return (
    <ul className="grid">
      <li className={classcat([itemClasses])}>Share</li>
      <li className={classcat([itemClasses])} onClick={() => openDialog(<BurnNFT />)}>
        Burn
      </li>
      {isListing ? (
        <>
          <li className={classcat([itemClasses])} onClick={() => openDialog(<DelistNFT />)}>
            Delist item
          </li>
          <li className={classcat([itemClasses])} onClick={() => openDialog(<ChangePrice />)}>
            Change Price
          </li>
        </>
      ) : (
        <li className={classcat([itemClasses])} onClick={() => openDialog(<ConfirmAddress />)}>
          Sell
        </li>
      )}
      <li className={classcat([itemClasses])} onClick={() => openDialog(<TransferNFT />)}>
        Transfer
      </li>
    </ul>
  );
}

const itemClasses = [
  'px-2.5 text-body3 text-text-50 py-2.5 text-left',
  'hover:text-primary cursor-pointer relative pl-6',
  'after:absolute after:h-1 after:w-1 after:bg-text-50 after:rounded-full',
  'after:top-5 after:left-3 hover:after:bg-primary',
];
