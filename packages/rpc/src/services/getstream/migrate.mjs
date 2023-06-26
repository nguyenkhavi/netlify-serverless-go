import { StreamChat } from 'stream-chat';

const getstreamClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_GETSTREAM_API_KEY || '',
  process.env.GETSTREAM_API_SECRET || '',
  {
    timeout: 30000,
  },
);
console.log(process.env.GETSTREAM_API_KEY, process.env.GETSTREAM_API_SECRET);

const migrateGetstream = async () => {
  await getstreamClient.updateChannelType('messaging', {
    grants: {
      user: [
        'read-channel',
        'create-channel',
        'create-message',
        'create-reaction',
        'delete-reaction-owner',
        'upload-attachment',
        'update-channel-members',
        'mute-channel',
        'delete-channel',
        'recreate-channel',
      ],
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
};
migrateGetstream();
