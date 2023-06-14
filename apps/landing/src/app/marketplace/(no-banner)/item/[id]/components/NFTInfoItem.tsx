//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { ReactNode } from 'react';

function NFTInfoItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={classcat(['flex justify-between'])}>
      <p className={classcat(['text-body3 text-primary-700', 'md:text-body2'])}>{label}</p>
      {typeof value === 'string' ? (
        <p className={classcat(['text-body3 text-text-50', 'md:text-body1'])}>{value}</p>
      ) : (
        value
      )}
    </div>
  );
}

export default NFTInfoItem;
