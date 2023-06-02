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
          className={classcat([
            'h-8.75 rounded-lg pl-8.5 pr-4 text-caption md:pl-4 md:pr-8.5',
            className,
          ])}
        />
        <SearchIcon
          className={classcat([
            'absolute left-3.5 top-1/2 -translate-y-1/2 md:left-auto md:right-3.5',
            'h-3.75 w-3.75',
          ])}
        />
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export default SearchInput;
