'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import { toastStore } from '_@shared/stores/toast/toastStore';

export default function BaseToast() {
  const { open, message, type, hideToast } = toastStore();

  return (
    <div
      className={classcat([
        'rounded-[5px] p-4',
        'w-86 items-center sm:w-102',
        `${open ? 'flex' : 'hidden'} fixed left-1/2 top-22 -translate-x-1/2`,
        `${type === 'success' ? 'bg-primary-shade-300' : 'bg-error'}`,
      ])}
    >
      <p className={classcat(['text-body2 text-white'])}>{message}</p>

      <div onClick={hideToast} className="absolute right-2.5 top-2.5 cursor-pointer">
        <CloseIcon className="text-white" />
      </div>
    </div>
  );
}
