//THIRD PARTY MODULES
import classcat from 'classcat';
import { Controller, useFormContext } from 'react-hook-form';
//LAYOUT, COMPONENTS
import CountrySelect from '_@shared/components/input/phone-input/CountrySelect';
//SHARED
import { getErrorMessage } from '_@shared/utils/func';

const baseClasses = [
  'w-full bg-transparent',
  'transition-colors',
  'focus-visible:outline-none',
  'text-text-50 placeholder:text-text-20',
];

type Props = {
  name: {
    digitalCode: string;
    phoneNumber: string;
  };
};

export default function FormPhoneInput({ name }: Props) {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const { onChange, ...props } = register(name.phoneNumber);
  const value = watch(name.phoneNumber);
  return (
    <div
      data-valid={
        !getErrorMessage(name.phoneNumber, errors) && !getErrorMessage(name.digitalCode, errors)
      }
      className={classcat([
        'flex space-x-2 rounded-lg border-[.5px] border-text-10 bg-secondary/70 px-4',
        'data-[valid="false"]:border-error',
      ])}
    >
      <Controller
        name={name.digitalCode}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CountrySelect className="shrink-0" onChange={onChange} value={value} />
        )}
      />

      <input
        className={classcat([baseClasses, 'h-16.25'])}
        placeholder="Enter Your Phone Number"
        value={value}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          const value = e.target.value || '';
          if (e.target.value === '' || re.test(value)) {
            onChange(e);
          }
        }}
        {...props}
      />
    </div>
  );
}
