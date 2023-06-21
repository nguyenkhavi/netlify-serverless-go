import { getstreamClient } from '_@rpc/services/getstream/getstream-client';

export const generateGetstreamUserToken = async (getstreamId: string) => {
  return getstreamClient.createToken(getstreamId);
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
