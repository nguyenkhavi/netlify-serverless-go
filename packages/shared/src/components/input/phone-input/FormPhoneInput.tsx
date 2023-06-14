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
  } = useFormContext();

  return (
    <div
      data-valid={
        !getErrorMessage(name.phoneNumber, errors) && !getErrorMessage(name.digitalCode, errors)
      }
      className={classcat([
        'flex space-x-2 rounded-[14px] border-[.5px] border-text-10 bg-secondary/70 px-4',
        'data-[valid="false"]:rounded-none data-[valid="false"]:shadow-[inset_0_-.66px] data-[valid="false"]:shadow-error',
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
        className={classcat([baseClasses])}
        placeholder="Enter Your Phone Number"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        {...register(name.phoneNumber)}
      />
    </div>
  );
}
