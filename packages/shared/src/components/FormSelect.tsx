//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import BaseSelect, { BaseSelectProps } from './BaseSelect';

export default function FormSelect({ name = '', ...props }: BaseSelectProps) {
  const {
    control,
    formState: { isValid, submitCount },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BaseSelect {...props} {...field} isValid={Boolean(!submitCount || isValid)} />
      )}
    />
  );
}
