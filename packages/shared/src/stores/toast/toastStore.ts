//THIRD PARTY MODULES
import { create } from 'zustand';

export interface ToastProps {
  open: boolean;
  message: string;
  type: 'success' | 'error';
  setOpen: (open: boolean) => void;
  openToast: (message: string, type?: ToastProps['type']) => void;
  hideToast: () => void;
}

export const toastStore = create<ToastProps>((set) => ({
  open: false,
  message: '',
  type: 'success',
  className: '',
  setOpen: (open: boolean, type: ToastProps['type'] = 'success') => set({ open, type }),
  openToast: (message: string, type?: ToastProps['type']) => {
    set({ open: true, type: type || 'success', message });

    setTimeout(() => {
      set({ open: false, message: '' });
    }, 3000);
  },
  hideToast: () => set({ open: false }),
}));

const { openToast, setOpen, hideToast } = toastStore.getState();
export const toastAction = { openToast, setOpen, hideToast };
