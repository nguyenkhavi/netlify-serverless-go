//THIRD PARTY MODULES
import classcat from 'classcat';
import { cloneElement, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  label: React.ReactNode;
  name: string;
  children: JSX.Element;
  className?: string;
  labelClasses?: string;
};

export default function FormItem({
  label,
  name,
  children,
  className = '',
  labelClasses = '',
}: Props) {
  const id = useId();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classcat(['grid gap-1', className])}>
      <label
        htmlFor={id}
        className={classcat(['cursor-pointer text-body1 font-medium text-text-80', labelClasses])}
      >
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
