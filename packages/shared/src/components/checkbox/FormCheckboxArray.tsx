//THIRD PARTY MODULES
import { useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import BaseCheckbox, { BaseCheckboxProps } from './BaseCheckboxArray';

const FormCheckboxArray = ({ name, ...props }: BaseCheckboxProps) => {
  const { register } = useFormContext();
  return <BaseCheckbox {...props} {...register(name)} />;
};

export default FormCheckboxArray;
