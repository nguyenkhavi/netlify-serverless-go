'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
//LAYOUT, COMPONENTS
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '_@shared/components/ui/command';
//SHARED
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
import countries, { Country, countryMapping } from '_@shared/constant/countries';

const Flag = ({ code }: { code: string }) => {
  return (
    <img
      src={`https://flagcdn.com/16x12/${code}.png`}
      srcSet={`https://flagcdn.com/32x24/${code}.png 2x, https://flagcdn.com/48x36/${code}.png 3x`}
      width="16"
      height="12"
      alt={`Flag of ${code}`}
    />
  );
};

type Props = {
  className?: string;
  onChange: (value: Country['code']) => void;
  value: Country['code'];
};

export default function CountrySelect({ className, onChange: _onChange, value: _value }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Country['code']>(_value);

  const valueSelected = countryMapping[value];

  const onChange = (value: Country['code']) => {
    setValue(value);
    _onChange?.(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={classcat(['h-full', className])}>
        <div className="flex items-center space-x-1">
          <Flag code={valueSelected?.code.toLowerCase()} />
          <span>+{valueSelected?.dialCode}</span>
          <ChevronDownIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72.5 bg-black p-0">
        <Command
          filter={(value, search) => {
            const code = value.toUpperCase() as Country['code'];
            const country = countryMapping[code];
            const searchList = [
              country.name.toLowerCase(),
              country.dialCode,
            ] as unknown as string[];
            return Number(searchList.some((item) => item.includes(search.toLowerCase())));
          }}
        >
          <CommandInput placeholder="Search Country..." />
          <CommandEmpty className="text-center">No country found.</CommandEmpty>
          <CommandGroup
            className={classcat([
              'max-h-[232px] overflow-auto py-1 ',
              '[&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:grid-flow-row',
              '[&_[cmdk-item]]:grid [&_[cmdk-item]]:grid-cols-[19px_1fr_50px] [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-1',
            ])}
          >
            {countries.map((country) => (
              <CommandItem
                value={country.code}
                key={country.code}
                onSelect={(selectedValue) => {
                  const selectedValueUpperCase = selectedValue.toUpperCase();
                  onChange(selectedValueUpperCase as any);
                  setOpen(false);
                }}
                className="rounded-sm py-1.5 hover:bg-gray-700/50"
              >
                <Flag code={country.code.toLowerCase()} />
                <span className="truncate">{country.name}</span>
                <span className="text-right">+{country.dialCode}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
