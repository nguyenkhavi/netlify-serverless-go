//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { useMemo } from 'react';
//SHARED
import ItemInfoIcon from '_@shared/icons/ItemInfoIcon';
//RELATIVE MODULES
import NFTInfoItem from './NFTInfoItem';

function NFTInfoCard() {
  const nftDetails = useMemo(
    () => [
      {
        label: 'Contact Address',
        value: (
          <p className={classcat(['text-body3 text-primary', 'md:text-body1'])}>
            {formatContactAddress(mockDataNTFDetail.contactAddress)}
          </p>
        ),
      },
      {
        label: 'Token ID',
        value: formatTokenId(mockDataNTFDetail.tokenId),
      },
      {
        label: 'Token Standard',
        value: mockDataNTFDetail.tokenStandard,
      },
      {
        label: 'Chain',
        value: mockDataNTFDetail.chain,
      },
      {
        label: 'Metadata',
        value: mockDataNTFDetail.metadata,
      },
      {
        label: 'Creator Earnings',
        value: mockDataNTFDetail.creatorEarning,
      },
      {
        label: 'Fleamint item no',
        value: mockDataNTFDetail.fleamintItemNo,
      },
    ],
    [],
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
        <div
          className={classcat(['p-4 text-body3 text-text-50', 'md:p-6 md:text-body1'])}
          dangerouslySetInnerHTML={{ __html: `${mockDataNTFDesc}` }}
        />
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

const formatContactAddress = (value: string) => {
  return value.substring(0, 6) + '....' + value.substring(value.length - 4);
};

const formatTokenId = (value: string) => {
  return value.substring(0, 14) + '..';
};

const mockDataNTFDesc = `<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
<ul>
<li>· totam rem</li>
<li>· aperiam, eaque ipsa quae ab illo </li>
<li>· inventore veritatis et quasi </li>
<li>· architecto beatae vitae dicta sunt explicabo.</li>
</ul>`;

const mockDataNTFDetail = {
  contactAddress: '0x5343daj89dabddh7g6f',
  tokenId: '13434345354353121',
  tokenStandard: 'ERC-1155',
  chain: 'BSC',
  metadata: 'Centralized',
  creatorEarning: '10%',
  fleamintItemNo: '324222',
};
