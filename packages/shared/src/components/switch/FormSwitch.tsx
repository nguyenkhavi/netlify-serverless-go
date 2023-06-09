//THIRD PARTY MODULES
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import BaseSwitch, { BaseSwitchProps } from './BaseSwitch';

type FormSwitchProps = {
  onChange?: (field: ControllerRenderProps<any, string>) => (value: boolean) => void;
} & Omit<BaseSwitchProps, 'onChange'>;

const FormSwitch = ({ name, onCheckedChange, onChange, ...props }: FormSwitchProps) => {
  const { control } = useFormContext();

  if (!name) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BaseSwitch
          onCheckedChange={(value) => {
            if (onChange) return onChange(field)(value); // Totally overwrite the default onChange
            if (onCheckedChange) onCheckedChange(value);
            field.onChange(value);
          }}
          checked={field.value}
          {...props}
        />
      )}
    />
  );
};

export default FormSwitch;
