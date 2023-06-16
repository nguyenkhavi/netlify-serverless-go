//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { useMemo } from 'react';
import { formatAddress, formatTokenId } from '_@landing/utils/format';
//SHARED
import ItemInfoIcon from '_@shared/icons/ItemInfoIcon';
//RELATIVE MODULES
import NFTInfoItem from './NFTInfoItem';
import { NFT_TYPES } from '../constants';
import { TypeMarketDetail } from '../type';

type Props = {
  data: TypeMarketDetail;
};

function NFTInfoCard({ data }: Props) {
  const nftDetails = useMemo(
    () => [
      {
        label: 'Contact Address',
        value: (
          <p className={classcat(['text-body3 text-primary', 'md:text-body1'])}>
            {formatAddress(data.collection.address)}
          </p>
        ),
      },
      {
        label: 'Token ID',
        value: formatTokenId(data.item.tokenId.toString()),
      },
      {
        label: 'Token Standard',
        value: NFT_TYPES?.[data.item.type],
      },
      {
        label: 'Chain',
        value: data.chain?.name,
      },
      {
        label: 'Creator Earnings',
        value: data.collection.royalty,
      },
    ],
    [
      data.chain?.name,
      data.collection.address,
      data.collection.royalty,
      data.item.tokenId,
      data.item.type,
    ],
  );

  return (
    <div className={classcat(['rounded-[theme(spacing[2])] bg-secondary-200'])}>
      <div className={classcat(['grid grid-flow-row'])}>
        <div
          className={classcat([
            'grid grid-flow-col items-center justify-start gap-1.75 border-b-[0.5px] border-solid border-text-10 p-4 md:p-6',
            'md:gap-2 md:p-6 ',
          ])}
        >
          <ItemInfoIcon className="h-4 w-4 text-primary md:h-6 md:w-6" />
          <p className={classcat(['text-h6 text-primary-700', 'md:text-h5-bold'])}>
            NFT Description
          </p>
        </div>
        <div className={classcat(['p-4 text-body3 text-text-50', 'md:p-6 md:text-body1'])}>
          <p className="text-body3 text-text-50 marker:md:text-body1">
            {data.item.metadata.description}
          </p>
        </div>
      </div>
      <div className={classcat(['grid grid-flow-row'])}>
        <div
          className={classcat([
            'grid grid-flow-col items-center justify-start gap-1.75 border-b-[0.5px] border-solid border-text-10 p-4 md:p-6',
            'md:gap-2 md:p-6 ',
          ])}
        >
          <ItemInfoIcon className="h-4 w-4 text-primary md:h-6 md:w-6" />
          <p className={classcat(['text-h6 text-primary-700', 'md:text-h5-bold'])}>NFT Details</p>
        </div>
        <div className={classcat(['grid grid-flow-row gap-1 p-4', 'md:gap-2 md:p-6'])}>
          {nftDetails.map((item, index) => (
            <NFTInfoItem key={index} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NFTInfoCard;
