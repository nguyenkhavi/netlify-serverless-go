//THIRD PARTY MODULES
import { StreamChat } from 'stream-chat';
import { useEffect, useState } from 'react';
import { nextApi } from '_@landing/utils/api';
import useAuthStore from '_@landing/stores/auth/useAuthStore';

export const useGetStreamUser = () => {
  const [token, setToken] = useState<string>();

  const { mutate: getStreamToken } = nextApi.getStreamGetUserToken.useMutation({
    onSuccess: (data: string) => {
      setToken(data);
    },
  });

  const [client, setClient] = useState<StreamChat>();

  const { user } = useAuthStore();

  useEffect(getStreamToken, [getStreamToken]);

  useEffect(() => {
    if (!token) return;

    const client = new StreamChat(process.env.NEXT_PUBLIC_GETSTREAM_API_KEY || '', {
      enableInsights: true,
      enableWSFallback: true,
    });

    client.connectUser(
      {
        id: user?.profile.userId || '',
        name: user?.profile.username || '',
        image: user?.profile.avatarUrl,
      },
      token,
    );

    const handleConnectionChange = ({ online = false }) => {
      if (!online) {
        setClient(undefined);
        return console.log('connection lost');
      }
      setClient(client);
    };
    client.on('connection.changed', handleConnectionChange);

    return () => {
      client.off('connection.changed', handleConnectionChange);
      client.disconnectUser().then(() => console.log('connection closed'));
    };
  }, [token, user?.profile]);

  return { client };
};
