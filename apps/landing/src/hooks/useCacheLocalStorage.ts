//THIRD PARTY MODULES
import { useCallback } from 'react';

type UseCacheLocalStorageProps = {
  key: string;
  maxItem: number;
};

type Item<T> = T & {
  __key: string;
};

export const useCacheLocalStorage = <T>({ maxItem, key }: UseCacheLocalStorageProps) => {
  const getItems = useCallback((): Item<T>[] | undefined => {
    const storageValue = localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : undefined;
  }, [key]);

  const setItems = useCallback(
    (__key: string, newItem: T) => {
      const items = getItems() || [];
      const newItems = items.find((item) => item.__key === __key)
        ? items
        : [{ __key, ...newItem }, ...items];
      if (newItems.length > maxItem) {
        newItems.pop();
      }
      localStorage.setItem(key, JSON.stringify(newItems));
    },
    [getItems, key, maxItem],
  );

  return {
    getItems,
    setItems,
  };
};
