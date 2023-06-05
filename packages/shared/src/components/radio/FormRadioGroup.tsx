//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form';
//SHARED
import { getErrorMessage } from '_@shared/utils/func';
//RELATIVE MODULES
import BaseRadioGroup, { BaseRadioGroupProps } from './BaseRadioGroup';

export default function FormRadioGroup({ name = '', ...props }: BaseRadioGroupProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isValid = !getErrorMessage(name, errors);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <BaseRadioGroup {...props} {...field} isValid={isValid} />}
    />
  );
}
