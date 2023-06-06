//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import {
  ReactNode,
  type ComponentPropsWithoutRef,
  cloneElement,
  ReactElement,
  forwardRef,
} from 'react';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';

/**
 * Tailwind Classes lookup directory
 */
const baseClasses = [
  'transition-all border w-full',
  'disabled:cursor-not-allowed',
  'focus-visible:outline-none focus-visible:ring',
  'grid grid-flow-col auto-cols-max items-center justify-center',
];

const colorClasses = {
  primary: {
    filled: [
      'focus-visible:ring-orange-600',
      'text-secondary-100 bg-primary border-primary',
      'hover:drop-shadow-btn',
      'disabled:hover:drop-shadow-none',
      'disabled:text-text-30 disabled:bg-primary disabled:bg-btn disabled:border-transparent',
    ],
    outlined: [
      'focus-visible:ring-orange-600',
      'text-primary border-primary',
      'hover:text-secondary-100 hover:bg-primary hover:border-primary',
      'hover:drop-shadow-btn',
      'disabled:hover:drop-shadow-none',
      'disabled:text-text-30 disabled:bg-primary disabled:bg-btn disabled:border-transparent',
    ],
    text: [
      'focus-visible:ring-orange-600',
      'text-primary border-none',
      'hover:bg-primary-600/[.08]',
      'disabled:text-primary-500/80 disabled:bg-transparent',
    ],
  },
  default: {
    filled: [
      'focus-visible:ring-orange-600',
      'text-secondary-400 bg-grey-300 border-grey-300',
      'hover:text-secondary-400 hover:bg-grey-300 hover:border-grey-300',
      'disabled:text-grey-500/80 disabled:bg-grey-500/[.24] disabled:border-grey-500/[.24]',
      'shadow-btn-default-filled',
    ],
    outlined: [
      'focus-visible:ring-orange-600',
      'text-white border-grey-500/[.32]',
      'hover:text-white hover:border-grey-500/[.32]',
      'disabled:text-grey-500/80 disabled:border-grey-500/[.24]',
    ],
    text: [
      'focus-visible:ring-orange-600',
      'text-white border-none',
      'hover:bg-white/[.08]',
      'disabled:text-grey-500/80 disabled:bg-transparent',
    ],
  },
} as const;

const shapeClasses = {
  square: 'rounded-none',
  rounded: 'rounded-lg',
  pill: 'rounded-full',
} as const;

const iconClasses = ['text-current'];

/**
 * Prop types
 */
type TagProps = ComponentPropsWithoutRef<typeof Link> | ComponentPropsWithoutRef<'button'>;
type Color = keyof typeof colorClasses;
type Variant = keyof (typeof colorClasses)[Color];
type Shape = keyof typeof shapeClasses;
type BaseProps = {
  as?: 'button' | typeof Link;
  color?: Color;
  variant?: Variant;
  shape?: Shape;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
};
type Props = TagProps & BaseProps;

/**
 * Component definition (with default variants)
 */
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  (
    {
      as,
      type,
      color = 'primary',
      variant = 'filled',
      shape = 'rounded',
      leadingIcon,
      children,
      trailingIcon,
      className = '',
      isLoading = false,
      disabled = false,
      ...props
    },
    forwardRef,
  ) => {
    const Tag = as || 'button';

    return (
      <Tag
        {...(props as any)}
        ref={forwardRef}
        type={type || 'button'}
        disabled={isLoading || disabled}
        className={classcat([
          baseClasses,
          'btnsm',
          colorClasses[color][variant],
          shapeClasses[shape],
          className,
        ])}
      >
        {isLoading ? (
          <LoadingIcon className={classcat([iconClasses])} />
        ) : (
          <>
            {leadingIcon
              ? cloneElement(leadingIcon as ReactElement, {
                  className: classcat([iconClasses, (leadingIcon as ReactElement).props.className]),
                })
              : null}

            <span>{children}</span>

            {trailingIcon
              ? cloneElement(trailingIcon as ReactElement, {
                  className: classcat([
                    iconClasses,
                    (trailingIcon as ReactElement).props.className,
                  ]),
                })
              : null}
          </>
        )}
      </Tag>
    );
  },
);
Button.displayName = 'Button';

export default Button;
