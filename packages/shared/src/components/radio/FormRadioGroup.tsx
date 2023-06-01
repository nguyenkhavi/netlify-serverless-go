//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import BaseRadioGroup, { BaseRadioGroupProps } from './BaseRadioGroup';

export default function FormRadioGroup({ name = '', ...props }: BaseRadioGroupProps) {
  const {
    control,
    formState: { isValid, submitCount },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BaseRadioGroup {...props} {...field} isValid={Boolean(!submitCount || isValid)} />
      )}
    />
  );
}
