'use client';
//THIRD PARTY MODULES
import { useCallback, useEffect } from 'react';
import { getAllCategories } from '_@landing/services/category';
import { categoryStore } from '_@landing/stores/categoryStore';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';

export default function useGetCategoryStore() {
  const { setCategory, setLoading } = categoryStore();

  const { db } = useIndexedDBContext();
  const _handleFetchData = useCallback(async () => {
    if (db === null) return;
    getAllCategories(db)
      .then((res) => {
        setCategory(res);
      })
      .catch((error) => {
        console.error('-----res category store error-----', error);
        setCategory([]);
      })
      .finally(() => setLoading(false));
  }, [db, setCategory, setLoading]);

  useEffect(() => {
    _handleFetchData();
  }, [_handleFetchData]);
}
