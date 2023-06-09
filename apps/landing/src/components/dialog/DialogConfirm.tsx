'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { dialogStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import { Dialog, DialogContent } from '_@shared/components/dialog/BaseDialog';

export const DIALOG_CONTENT = {
  'delete-address': {
    title: 'Delete this address',
    message: 'This address will be permanently deleted.',
    textButton: 'Delete',
  },
};
export function DialogConfirm() {
  const { open, action, setOpen, hideDialog } = dialogStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="ow:rounded-[10px] ow:bg-black ow:px-7 ow:pb-0 ow:pt-4">
        <p className="mb-3 text-h5-bold">{DIALOG_CONTENT[action.type].title || 'Warning'}</p>
        <p className="mb-6 text-body1 text-text-50">{DIALOG_CONTENT[action.type].message || ''}</p>
        <div
          className={classcat([
            '-mx-7 px-12.5 py-4 text-body2',
            'flex justify-center md:justify-end',
            'border-t border-text-10',
          ])}
        >
          <button className="uppercase text-primary" onClick={hideDialog}>
            Close
          </button>
          <button className="ml-8 uppercase text-error" onClick={action.callback}>
            {DIALOG_CONTENT[action.type].textButton || 'Yes'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
