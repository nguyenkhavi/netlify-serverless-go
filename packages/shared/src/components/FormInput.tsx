//THIRD PARTY MODULES
import { useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import BaseInput, { BaseInputProps } from './BaseInput';

export default function FormInput({ name = '', ...props }: BaseInputProps) {
  const { register } = useFormContext();

  return <BaseInput {...props} {...register(name)} />;
}
