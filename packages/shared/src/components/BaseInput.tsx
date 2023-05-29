'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import {
  HTMLInputTypeAttribute,
  forwardRef,
  ComponentPropsWithoutRef,
  useRef,
  useImperativeHandle,
  useReducer,
  cloneElement,
  ReactElement,
  ReactNode,
} from 'react';
//SHARED
import EyeIcon from '_@shared/icons/EyeIcon';
//RELATIVE MODULES
import Show from './Show';
//TYPES MODULES
import type { Assign } from '_@shared/utils/type';

const baseClasses = [
  'transition-all',
  'focus-visible:outline-none',
  'border-[.5px] border-text-10',
  'bg-secondary/70 w-full',
  'text-text-50 placeholder:text-text-20',
  'data-[invalid="true"]:shadow-[inset_0_1px] data-[invalid="true"]:shadow-error',
];

type TElement = HTMLInputElement | HTMLTextAreaElement;
type Tag = 'input' | 'textarea';
export type BaseInputProps = Assign<
  ComponentPropsWithoutRef<Tag>,
  {
    tag?: Tag;
    type?: HTMLInputTypeAttribute;
    hint?: string;
    trailingComponent?: ReactNode;
  }
>;

const BaseInput = forwardRef<TElement, BaseInputProps>(
  (
    { tag = 'input', type = 'text', hint, trailingComponent, className = '', ...props },
    forwardedRef,
  ) => {
    const Tag = tag;
    const inputRef = useRef<TElement>(null);
    const trailingRef = useRef<HTMLDivElement>(null);
    const [innerType, toggleInnerType] = useReducer(
      (prevType) => (prevType === 'text' ? 'password' : 'text'),
      // @ts-ignore
      type,
    );

    useImperativeHandle(forwardedRef, () => inputRef.current as TElement);

    return (
      <div className="relative">
        <Tag
          {...(props as any)}
          ref={inputRef}
          {...(tag === 'input' ? { type: innerType } : {})}
          className={classcat([
            baseClasses,
            tag === 'input' ? 'input-sm' : 'textarea-sm',
            type === 'password' ? 'input-password' : '',
            className,
          ])}
          style={{
            ...(trailingRef.current
              ? {
                  paddingRight:
                    (trailingRef.current.getBoundingClientRect().width + 32) / 16 + 'rem',
                }
              : {}),
          }}
        />

        {type === 'password' ? (
          <EyeIcon
            onClick={() => {
              toggleInnerType();
              inputRef.current?.focus();
            }}
          />
        ) : trailingComponent ? (
          <div ref={trailingRef} className="absolute bottom-1/2 right-4 grid translate-y-1/2">
            {cloneElement(trailingComponent as ReactElement)}
          </div>
        ) : null}

        <Show when={hint}>
          <p className="mt-1.5 text-body3 text-text-50">{hint}</p>
        </Show>
      </div>
    );
  },
);

export default BaseInput;

BaseInput.displayName = 'BaseInput';
