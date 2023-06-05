//THIRD PARTY MODULES
import { useFormContext } from 'react-hook-form';
//SHARED
import { getErrorMessage } from '_@shared/utils/func';
//RELATIVE MODULES
import BaseInput, { BaseInputProps } from './BaseInput';

export default function FormInput({ name = '', ...props }: BaseInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isValid = !getErrorMessage(name, errors);

  return <BaseInput {...props} {...register(name)} isValid={isValid} />;
}
