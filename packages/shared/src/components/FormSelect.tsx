//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form';
//SHARED
import { getErrorMessage } from '_@shared/utils/func';
//RELATIVE MODULES
import BaseSelect, { BaseSelectProps } from './BaseSelect';

export default function FormSelect({ name = '', ...props }: BaseSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isValid = !getErrorMessage(name, errors);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <BaseSelect {...props} {...field} isValid={isValid} />}
    />
  );
}
