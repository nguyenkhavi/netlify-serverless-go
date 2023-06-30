import { StreamChat } from 'stream-chat';
import * as stream from 'getstream';
import { StreamType } from './type';

export const getstreamChatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_GETSTREAM_API_KEY as string,
  process.env.GETSTREAM_API_SECRET as string,
);

export const getstreamClient = stream.connect<StreamType>(
  process.env.NEXT_PUBLIC_GETSTREAM_API_KEY as string,
  process.env.GETSTREAM_API_SECRET as string,
  process.env.GETSTREAM_APP_ID,
  { location: process.env.GETSTREAM_LOCATION },
);
