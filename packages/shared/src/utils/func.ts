//THIRD PARTY MODULES
import { FieldErrors, FieldValues } from 'react-hook-form';

export const debounce = (fn: Function, ms: number) => {
  let t: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};
export const throttle = (fn: Function, ms: number) => {
  let t: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (t !== null) return;
    t = setTimeout(() => {
      fn(...args);
      t = null;
    }, ms);
  };
};

export const getErrorMessage = (name: string, errors: FieldErrors<FieldValues>) => {
  const error = name.split('.').reduce((obj, key) => (obj ? obj[key] : undefined), errors as any);
  return typeof error === 'object' ? (error.message as string) : '';
};
