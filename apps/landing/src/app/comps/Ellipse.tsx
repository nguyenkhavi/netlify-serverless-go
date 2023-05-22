//THIRD PARTY MODULES
import classcat from 'classcat';

const ellipseClasses1 = ['absolute rounded-full bg-primary blur-[330px] h-[416px] w-[467px]'];
const ellipseClasses2 = ['absolute rounded-full bg-primary blur-[330px] h-[368px] w-[387px]'];

export default function Ellipse() {
  return (
    <>
      <div
        className={classcat([
          ellipseClasses1,
          'right-[calc(100%+42px)] top-[345px] block xlg:hidden',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses1,
          'left-[calc(100%+47px)] top-[1199px] block xlg:hidden',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses2,
          'right-[calc(100%+48px)] top-[4144px] block xlg:hidden',
        ])}
      />

      <div
        className={classcat([
          ellipseClasses1,
          'bottom-[calc(100%+6px)] left-[389px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses1,
          'right-[calc(100%-8px)] top-[738px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses1,
          'left-[calc(100%+12px)] top-[409px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([ellipseClasses2, 'left-[-193.5px] top-[3225px] hidden xlg:block'])}
      />
    </>
  );
}
