import { getstreamClient } from '../../services/getstream/getstream-client';

export const generateGetstreamUserToken = async (userId: string) => {
  const token = getstreamClient.createToken(userId);

  return token;
};

// !BE-use: Call on an auction created
export const upsertChannel = async (listingId: string, userId: string) => {
  const channel = getstreamClient.channel('messaging', listingId, {
    name: listingId,
    created_by_id: userId,
  });

  await channel.create();

  return channel;
};
