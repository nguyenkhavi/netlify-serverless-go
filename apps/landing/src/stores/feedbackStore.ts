//THIRD PARTY MODULES
import { create } from 'zustand';

interface FeedbackStoreProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const feedbackStore = create<FeedbackStoreProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
