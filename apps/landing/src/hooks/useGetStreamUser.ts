//THIRD PARTY MODULES
import { StreamChat } from 'stream-chat';
import { useEffect, useState } from 'react';
import { nextApi } from '_@landing/utils/api';
import useAuthStore from '_@landing/stores/auth/useAuthStore';

export const useGetStreamUser = () => {
  const { data: token } = nextApi.getstreamGetUserToken.useQuery(undefined, {
    staleTime: 30000,
  });

  const [client, setClient] = useState<StreamChat>();

  const { user } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    const client = new StreamChat(process.env.NEXT_PUBLIC_GETSTREAM_API_KEY || '', {
      enableInsights: true,
      enableWSFallback: true,
    });

    client.connectUser(
      {
        id: user?.profile.getstreamId ?? '',
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
  }, [token, user?.profile.avatarUrl, user?.profile.username, user?.profile.getstreamId]);

  return { client };
};
