'use client';
//THIRD PARTY MODULES
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import { Dialog, DialogContent } from '_@shared/components/dialog/BaseDialog';

export function DialogOptionMyItem() {
  const { open, content, setOpen } = dialogMyItemCardStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="ow:w-89.5 ow:rounded-lg ow:bg-black ow:p-4 ow:md:w-124.5 ow:md:p-6"
        showClose={false}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
}
