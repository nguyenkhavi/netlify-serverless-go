//THIRD PARTY MODULES
import { useMemo } from 'react';
//HOOK
import { client } from '_@landing/hooks/useGetStreamUser';

type TArgs = {
  id: string;
  enable: boolean;
};
export const useChannel = ({ id, enable }: TArgs) => {
  const channel = useMemo(
    () =>
      enable
        ? client.channel('messaging', id, {
            image: 'dave.png',
            name: 'Create a Messaging Channel',
          })
        : null,
    [enable, id],
  );
  return channel;
};
