//THIRD PARTY MODULES
import { create } from 'zustand';
import { ICategory } from '_@landing/utils/type';

interface CategoryStoreProps {
  category: ICategory[];
  isLoading: boolean;
  setCategory: (category: ICategory[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const categoryStore = create<CategoryStoreProps>((set) => ({
  category: [],
  isLoading: true,
  setCategory(category: ICategory[]) {
    set({ category });
  },
  setLoading(isLoading: boolean) {
    set({ isLoading });
  },
}));
