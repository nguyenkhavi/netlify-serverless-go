//THIRD PARTY MODULES
import { api } from '_@landing/utils/api';
import { Channel, StreamChat } from 'stream-chat';
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

const checkInviteUserHaveFollowUser = async (createdUser: string, invitedUser: string) => {
  return await api.communityGetFollowingEachOtherInfoOf2User.query({
    getstreamId: createdUser,
    targetGetstreamId: invitedUser,
  });
};

const createRequestChannel = async (
  client: StreamChat<DefaultStreamChatGenerics>,
  createdUser: string,
  invitedUser: string,
  roomId: string,
) => {
  const channel = await client.channel('messaging', roomId, {
    members: [createdUser],
  });
  await channel.create();
  await channel.inviteMembers([invitedUser]);
  return channel;
};

const createChannel = async (
  client: StreamChat<DefaultStreamChatGenerics>,
  createdUser: string,
  invitedUser: string,
  roomId: string,
) => {
  const channel = await client.channel('messaging', roomId, {
    members: [createdUser, invitedUser],
  });
  await channel.create();
  return channel;
};

export const createRequestChannel1vs1 = async (
  client: StreamChat<DefaultStreamChatGenerics>,
  createdUser: string,
  invitedUser: string,
) => {
  try {
    const roomId = generateRoomIdChat1vs1(createdUser, invitedUser);
    const existedChannel = await checkChannelExistById(client, roomId);
    const members = await existedChannel?.queryMembers({});
    const invitedUserInRoom = await members?.members.find((item) => item.user_id === invitedUser);

    if (!invitedUserInRoom && existedChannel) {
      await existedChannel.inviteMembers([invitedUser]);
    }

    if (existedChannel) return existedChannel;

    const checkFollow = await checkInviteUserHaveFollowUser(createdUser, invitedUser);
    if (checkFollow.followed) return createChannel(client, createdUser, invitedUser, roomId);
    return createRequestChannel(client, createdUser, invitedUser, roomId);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const shouldDeleteChannel = async (channel: Channel<DefaultStreamChatGenerics>) => {
  if (!channel) return;
  const members = await channel.queryMembers({});
  return members.members.length === 1;
};
