//THIRD PARTY MODULES
import { useUser } from '@clerk/nextjs';
import { StreamChat } from 'stream-chat';
import { api } from '_@landing/utils/api';
import { useEffect, useState } from 'react';

export const useGetStreamUser = () => {
  const [token, setToken] = useState<string>();

  const { mutate: getStreamToken } = api['getstream-get-user-token'].useMutation({
    onSuccess: (data: string) => {
      setToken(data);
    },
  });

  const [client, setClient] = useState<StreamChat>();

  const { user } = useUser();

  useEffect(getStreamToken, [getStreamToken]);

  useEffect(() => {
    if (!token) return;

    const client = new StreamChat(process.env.NEXT_PUBLIC_GETSTREAM_API_KEY || '', {
      enableInsights: true,
      enableWSFallback: true,
    });

    client.connectUser(
      {
        id: 'minh1',
        name: user?.username || '',
        image: user?.imageUrl,
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
  }, [token, user?.imageUrl, user?.username]);

  return { client };
};
