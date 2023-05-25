import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../../services/aws/aws-s3';
import { GetPresignedUrlInput } from './aws.validator';

export const getPresignedUrl = async (input: GetPresignedUrlInput) => {
  const [type, extFile] = input.contentType.split('/');
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth() + 1;
  const key = `${type}s/${yyyy}/${mm}/${Math.random().toString(32).slice(2, 15)}.${extFile}`;

  const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET_NAME, Key: key });
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return {
    uploadUrl,
  };
};
