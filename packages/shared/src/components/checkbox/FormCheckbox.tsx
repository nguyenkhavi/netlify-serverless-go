//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import BaseCheckbox, { BaseCheckboxProps } from './BaseCheckbox';

const FormCheckbox = ({ name, ...props }: BaseCheckboxProps) => {
  const { control } = useFormContext();

  if (!name) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <BaseCheckbox {...props} {...field} />}
    ></Controller>
  );
};

export default FormCheckbox;
