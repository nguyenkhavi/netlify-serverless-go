//THIRD PARTY MODULES
import { z } from 'zod';
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ACCEPTED_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-ms-wmv',
  'video/x-msvideo',
  'video/3gpp',
  'video/MP2T',
  'video/x-flv',
];

const ACCEPTED_CONTENT_TYPES = [ACCEPTED_IMAGE_TYPES, ACCEPTED_VIDEO_TYPES].flat();

export const getPresignedUrlSchema = z
  .object({
    contentType: z.string().trim(),
  })
  .refine((data) => ACCEPTED_CONTENT_TYPES.includes(data.contentType), 'Format is not supported.');
export type GetPresignedUrlInput = z.infer<typeof getPresignedUrlSchema>;
