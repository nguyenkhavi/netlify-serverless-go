//THIRD PARTY MODULES
import classcat from 'classcat';

export default function Copyright() {
  return (
    <div
      className={classcat([
        'mt-5 pt-3 shadow-[inset_0_1px] shadow-white/[.15]',
        'sm:mt-12 sm:pt-5 sm:shadow-white/5',
      ])}
    >
      <div
        className={classcat([
          'mx-auto max-w-[284px] text-center',
          'text-[12px] font-normal leading-[18px] text-text-50',
          'sm:max-w-none  sm:text-[color:#A6A6A6]',
        ])}
      >
        &copy; 2022 Fleamint. All right reserved. Powered by Fleamint Foundation DAO
      </div>
    </div>
  );
}
