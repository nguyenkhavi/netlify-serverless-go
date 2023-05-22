//THIRD PARTY MODULES
import classcat from 'classcat';

const ellipseClasses = ['absolute rounded-full bg-primary blur-[330px] h-[416px] w-[467px]'];

export default function Ellipse() {
  return (
    <>
      <div
        className={classcat([
          ellipseClasses,
          'right-[calc(100%+42px)] top-[345px] block xlg:hidden',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses,
          'bottom-[calc(100%+6px)] left-[389px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses,
          'right-[calc(100%-8px)] top-[738px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses,
          'left-[calc(100%+12px)] top-[409px] hidden xlg:block',
        ])}
      />
    </>
  );
}
