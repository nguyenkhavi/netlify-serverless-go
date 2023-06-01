import { StreamChat } from 'stream-chat';

const getstreamClient = StreamChat.getInstance(
  process.env.GETSTREAM_API_KEY || '',
  process.env.GETSTREAM_API_SECRET || '',
);

const migrateGetstream = async () => {
  await getstreamClient.updateChannelType('messaging', {
    grants: {
      user: ['read-channel', 'create-message', 'create-reaction', 'delete-reaction-owner'],
      guest: ['read-channel'],
      channel_moderator: [],
      moderator: ['pin-message'],
      channel_member: [],
      global_moderator: [],
      global_admin: [],
      admin: [],
    },
  });
  const { grants } = await getstreamClient.getChannelType('messaging');
  console.log(`[*]: GETSTREAM MESSAGING GRANTS:`, grants);
  await getstreamClient.upsertUser({
    id: 'minh1',
    role: 'admin',
  });
  // user object is now {id: userID, role: 'admin', book: 'dune'}
};
migrateGetstream();
