//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { useCallback, useEffect, useState } from 'react';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';

export default function useGetData<T extends {}>(
  cbGetData: (db: IDBPDatabase<unknown>) => Promise<T>,
) {
  const [data, setData] = useState<{ data?: T; loading: boolean }>({
    data: undefined,
    loading: true,
  });
  const { db } = useIndexedDBContext();
  const _handleFetchData = useCallback(async () => {
    if (db === null) return;
    cbGetData(db).then((res) => {
      setData({ data: res, loading: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  useEffect(() => {
    _handleFetchData();
  }, [_handleFetchData]);

  return data;
}
