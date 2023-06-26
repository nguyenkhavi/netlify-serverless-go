//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';

function MenuMobile() {
  return (
    <div className={classcat(['grid grid-flow-col items-center justify-between p-4', 'md:hidden'])}>
      <p className={classcat(['text-subtitle1 text-primary-700'])}>Message</p>
      <Button
        className={classcat([
          'rounded-[theme(spacing[1.25])] border-none bg-secondary-200',
          'ow:h-10.5 ow:w-11.25 ow:p-0 [&>svg]:ml-2 [&>svg]:h-6 [&>svg]:w-6',
        ])}
        leadingIcon={<MenuIcon className={classcat(['text-text-50'])} />}
      />
    </div>
  );
}

export default MenuMobile;
