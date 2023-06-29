import { getstreamChatClient, getstreamClient } from '_@rpc/services/getstream/getstream-client';

export const generateGetstreamUserToken = async (getstreamId: string) => {
  // Create 2 token to create chatUser and feedUser, return 1 token cuz chatUser and feedUser use the same one
  getstreamChatClient.createToken(getstreamId);
  return getstreamClient.createUserToken(getstreamId);
};
