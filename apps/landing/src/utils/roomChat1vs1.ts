//THIRD PARTY MODULES
import { StreamChat } from 'stream-chat';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

export const CHAT_1VS1_PREFIX = 'CHAT_1VS1_';

export const generateRoomIdChat1vs1 = (id1: string, id2: string) => {
  return `${CHAT_1VS1_PREFIX}_${[id1, id2].sort((a, b) => a.localeCompare(b)).join('-')}`;
};

export const checkChannelExistById = async (
  client: StreamChat<DefaultStreamChatGenerics>,
  roomId: string,
) => {
  try {
    const channels = await client.queryChannels({
      id: roomId,
    });
    return channels?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const createChannel1vs1 = async (
  client: StreamChat<DefaultStreamChatGenerics>,
  createdUser: string,
  inviteUser: string,
) => {
  try {
    // const roomId = generateRoomIdChat1vs1(createdUser, inviteUser);
    const roomId = `${CHAT_1VS1_PREFIX}TEST_1`;
    const existedChannel = await checkChannelExistById(client, roomId);
    if (existedChannel) return existedChannel;
    const channel = await client.channel('messaging', roomId, {
      members: [createdUser],
    });
    await channel.create();
    await channel.inviteMembers([inviteUser]);
    return channel;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
