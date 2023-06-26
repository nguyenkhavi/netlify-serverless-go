//THIRD PARTY MODULES
import { StreamClient } from 'getstream';
import { useCallback, useEffect, useState } from 'react';
//RELATIVE MODULES
import { StreamType } from './useGetFeedUser';

export const useCheckFollowUser = (client?: StreamClient<StreamType>, id?: string) => {
  const [followed, setFollowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const _checkFollow = useCallback(() => {
    if (!client || !id) return;
    const userFeed = client?.feed('timeline');
    if (!userFeed) return;

    setLoading(true);
    userFeed
      .following({ offset: 0, limit: 1, filter: [`user:${id}`] })
      .then((rp) => {
        setFollowed(rp.results.length > 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [client, id]);

  useEffect(() => {
    _checkFollow();
  }, [_checkFollow]);

  return {
    loading,
    followed,
  };
};
