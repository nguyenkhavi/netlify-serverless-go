//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon';
//RELATIVE MODULES
import './popup.css';
import { useModalContext } from '../../context/ModalProvider';

function ChatSettingModal() {
  const [value, setValue] = useState<boolean>(true);
  const { openSetting, setOpenSetting } = useModalContext();

  const onClose = () => {
    setOpenSetting(false);
  };

  return (
    <Modal.Root open={openSetting}>
      <Modal.Overlay className="fixed inset-0 z-overlay bg-secondary-200 opacity-60" />
      <Modal.Content
        className={classcat([
          'rounded-lg border border-solid border-text-30 bg-secondary will-change-[transform,opacity]',
          'w-90 md:w-150',
          'fixed left-1/2 top-1/2 z-toast -translate-x-1/2 -translate-y-1/2',
        ])}
      >
        <div className="flex flex-col">
          <div
            className={classcat([
              'grid grid-flow-col items-center justify-between gap-2 border-b border-text-10 p-4 md:p-6',
            ])}
          >
            <div className={classcat(['grid grid-flow-col items-center justify-start gap-2'])}>
              <button onClick={onClose}>
                <ChevronLeftIcon />
              </button>
              <p className={classcat(['text-h6 text-primary-700'])}>Message Setting</p>
            </div>
          </div>

          <div
            className={classcat([
              'grid grid-flow-col items-center gap-6 p-4',
              'md:gap-37.25 md:p-6',
            ])}
          >
            <div className={classcat(['grid grid-flow-row gap-1'])}>
              <p className={classcat(['text-body2 text-primary-700'])}>Disable message requests.</p>
              <p className={classcat(['text-body3 text-[#666666]'])}>
                Let people who you don’t follow you request and add you to a group conversation.{' '}
                <a
                  className={classcat(['text-info'])}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Learn more
                </a>
              </p>
            </div>
            <label htmlFor="disable-message-requests">
              <input
                className={classcat(['hidden'])}
                type="checkbox"
                id="disable-message-requests"
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
              />
              <div
                className={classcat([
                  'flex h-4 w-4 items-center justify-center rounded-full bg-white',
                  value ? 'bg-linear drop-shadow-btn' : '',
                ])}
              >
                <Show when={value}>
                  <CheckIcon className="text-secondary" />
                </Show>
              </div>
            </label>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ChatSettingModal;
