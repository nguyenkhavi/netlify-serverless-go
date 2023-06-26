import * as stream from 'getstream';
import { StreamType } from './type';

export const getstreamClient = stream.connect<StreamType>(
  process.env.GETSTREAM_API_KEY as string,
  process.env.GETSTREAM_API_SECRET as string,
  process.env.GETSTREAM_APP_ID,
  { location: process.env.GETSTREAM_LOCATION },
);
