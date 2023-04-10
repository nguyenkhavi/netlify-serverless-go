//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { ComponentPropsWithRef } from 'react';
//TYPES MODULES
import type { Assign } from '_@shared/utils/type';

const baseClasses =
  'w-full border-[1px] border-solid border-blu-200 hocus:border-blue-300 bg-transparent  text-14 text-blu-400 pi-3 placeholder:text-blu-200';
const sizeClasses = {
  large: 'py-3.5',
  small: 'py-2',
} as const;

export type BaseInputProps = Assign<
  ComponentPropsWithRef<'input'>,
  { size?: keyof typeof sizeClasses }
>;

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className = '', size = 'large', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classcat([baseClasses, sizeClasses[size], className])}
        {...props}
      />
    );
  }
);

export default BaseInput;
