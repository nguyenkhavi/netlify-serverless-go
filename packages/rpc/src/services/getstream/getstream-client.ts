import { StreamChat } from 'stream-chat';
import * as stream from 'getstream';
import { StreamType } from './type';

export const getstreamClient = StreamChat.getInstance(
  process.env.GETSTREAM_API_KEY || '',
  process.env.GETSTREAM_API_SECRET || '',
);

export const getstreamFeedClient = stream.connect<StreamType>(
  process.env.GETSTREAM_API_KEY as string,
  process.env.GETSTREAM_API_SECRET as string,
  process.env.GETSTREAM_APP_ID,
  { location: process.env.GETSTREAM_LOCATION },
);
