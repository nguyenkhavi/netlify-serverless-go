//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon';
//RELATIVE MODULES
import { useModalContext } from '../../context/ModalProvider';

function ReportModal() {
  const { openReport, setOpenReport } = useModalContext();

  const onClose = () => {
    setOpenReport(false);
  };

  return (
    <Modal.Root open={openReport}>
      <Modal.Overlay className="fixed inset-0 z-toast bg-secondary-200 opacity-60" />
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
              <p className={classcat(['text-h6 text-primary-700'])}>New Report an issue</p>
            </div>
          </div>

          <div className={classcat(['p-4', 'md:p-6'])}>
            <div className={classcat(['grid bg-secondary-200'])}>
              <div className={classcat(['grid gap-2 border-b border-solid border-text-10 p-4'])}>
                <p className={classcat(['text-body1 text-text-80 opacity-50'])}>
                  Help us understand the issue.What’s the problem with this Conversation?
                </p>
                <button
                  onClick={onClose}
                  className={classcat(['text-start text-body2 text-white/50'])}
                >
                  It’s spam
                </button>
              </div>
              <button
                onClick={onClose}
                className={classcat([
                  'border-b border-solid border-text-10 p-4 text-start text-white/50',
                ])}
              >
                It’s abusive or Harmful
              </button>
              <p className={classcat(['p-4 text-body3 text-white/50'])}>
                <a
                  className={classcat(['text-info'])}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Learn more
                </a>{' '}
                about reporting violations of our rules.
              </p>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ReportModal;
