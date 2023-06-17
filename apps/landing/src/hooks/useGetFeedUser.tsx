//THIRD PARTY MODULES
import 'react-activity-feed';
import { nextApi } from '_@landing/utils/api';
import { connect, StreamClient } from 'getstream';
import { useCallback, useEffect, useState } from 'react';

export const useGetFeedUser = () => {
  const [token, setToken] = useState<string>();

  const { mutate: getStreamToken } = nextApi.getstreamGetUserToken.useMutation({
    onSuccess: (data: string) => {
      setToken(data);
    },
  });

  const [client, setClient] = useState<StreamClient>();

  const initClient = useCallback(async () => {
    if (
      !process.env.NEXT_PUBLIC_GETSTREAM_API_KEY ||
      !token ||
      !process.env.NEXT_PUBLIC_GETSTREAM_APP_ID
    )
      return;

    const client = connect(
      process.env.NEXT_PUBLIC_GETSTREAM_API_KEY,
      token,
      process.env.NEXT_PUBLIC_GETSTREAM_APP_ID,
    );
    setClient(client);
  }, [token]);

  useEffect(() => {
    getStreamToken();
  }, [getStreamToken]);

  useEffect(() => {
    initClient();
  }, [initClient]);

  return { client };
};
