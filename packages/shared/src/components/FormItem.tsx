//THIRD PARTY MODULES
import { cloneElement, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  label: string;
  name: string;
  children: JSX.Element;
};

export default function FormItem({ label, name, children }: Props) {
  const id = useId();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-2.5">
      <label htmlFor={id} className="cursor-pointer text-body1 font-medium text-text-80">
        {label}
      </label>
      {cloneElement(children, { id, name })}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <p id={`err-${id}`} className="text-body3 text-error">
            {message}
          </p>
        )}
      />
    </div>
  );
}
