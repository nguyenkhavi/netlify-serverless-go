//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
//SHARED
import SearchIcon from '_@shared/icons/SearchIcon';
//RELATIVE MODULES
import BaseInput, { BaseInputProps } from './BaseInput';

type SearchInputProps = {
  boxClasses?: string;
} & BaseInputProps;

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ name = '', className = '', boxClasses = '', ...props }, ref) => {
    return (
      <div className={classcat(['relative', boxClasses])}>
        <BaseInput
          ref={ref}
          {...props}
          name={name}
          className={classcat(['h-10 rounded-lg pl-12 pr-4 text-caption', className])}
        />
        <span
          className={classcat([
            'absolute left-4 top-1/2 -translate-y-1/2',
            'grid h-6 w-6 place-items-center',
          ])}
        >
          <SearchIcon className={classcat(['h-5 w-5 text-white'])} />
        </span>
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export default SearchInput;
