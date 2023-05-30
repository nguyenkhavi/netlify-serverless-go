//THIRD PARTY MODULES
import { useUser } from '@clerk/nextjs';
import { StreamChat } from 'stream-chat';
import { api } from '_@landing/utils/api';
import { useCallback, useEffect, useState } from 'react';

export const client = new StreamChat(process.env.NEXT_PUBLIC_GETSTREAM_API_KEY || '', {
  enableInsights: true,
  enableWSFallback: true,
});
export const useGetStreamUser = () => {
  const { mutateAsync: getStreamToken } = api.getstream.generateGetstreamUserToken.useMutation({});
  const { user } = useUser();
  const [connected, setConnected] = useState(false);

  const initialize = useCallback(async () => {
    if (!user) return;
    const token = await getStreamToken();

    const connectUser = await client.connectUser(
      {
        id: user?.id,
        name: user?.username || '',
        image: user?.imageUrl,
      },
      token,
    );
    setConnected(true);
    return connectUser;
  }, [getStreamToken, user]);
  useEffect(() => {
    if (!user?.id) return;
    const connectUser = initialize();
    return () => {
      if (client) {
        connectUser.then(() => {
          setConnected(false);
          client.disconnectUser().catch((e) => {
            console.error(`Failed to disconnect user`, e);
          });
        });
      }
    };
  }, [initialize, user]);

  return { client, connected };
};
