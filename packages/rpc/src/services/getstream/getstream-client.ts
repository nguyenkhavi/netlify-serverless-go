import { StreamChat } from 'stream-chat';

export const getstreamClient = StreamChat.getInstance(
  process.env.GETSTREAM_API_KEY || '',
  process.env.GETSTREAM_API_SECRET || '',
);
