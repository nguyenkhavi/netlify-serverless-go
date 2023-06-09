//THIRD PARTY MODULES
import { create } from 'zustand'
//LAYOUT, COMPONENTS
import { DIALOG_CONTENT } from '_@landing/components/dialog/DialogConfirm'
//LAYOUT, COMPONENTS
//TYPES MODULES
export type TAction = {
  type: keyof typeof DIALOG_CONTENT;
  callback: () => void;
};

interface DialogProps {
  open: boolean;
  action: TAction;
  setOpen: (open: boolean) => void;
  openDialog: (action: TAction) => void;
  hideDialog: () => void;
}

export const dialogStore = create<DialogProps>((set) => ({
  open: false,
  action: {
    type: 'delete-address',
    callback: () => {},
  },
  setOpen: (open: boolean) => set({ open }),
  openDialog: (action: TAction) => set({ open: true, action }),
  hideDialog: () => set({ open: false }),
}));
