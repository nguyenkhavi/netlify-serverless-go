//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
import { TypeMarketDetail } from '../type';

function TraitItem({
  data,
}: {
  data: NonNullable<TypeMarketDetail>['item']['metadata']['attributes'][number];
}) {
  return (
    <div
      className={classcat([
        'grid rounded-[theme(spacing[2.5])] border border-solid border-text-10 bg-secondary-200 p-4',
      ])}
    >
      <p className={classcat(['truncate text-body2 text-text-50'])}>{data.trait_type}</p>
      <div className={classcat(['grid grid-flow-col justify-start gap-1 text-body2'])}>
        <p className={classcat(['text-primary-700'])}>{data.value}</p>
        <p className={classcat(['text-text-50'])}>{data.rate}%</p>
      </div>
      <div
        className={classcat([
          'grid grid-flow-col justify-start gap-1 whitespace-nowrap text-body2',
        ])}
      >
        <p className={classcat(['text-text-50'])}>Floor:</p>
        <p className={classcat(['text-text-50'])}>
          {data.floor} {data.token?.symbol}
        </p>
      </div>
    </div>
  );
}

export default TraitItem;
