import { z } from 'zod';

export const page = z.coerce.number().min(1).catch(1);
export const size = z.coerce.number().min(1).catch(10);

export const paginationSchema = z.object({ page, size });
export type TPaginationInput = z.infer<typeof paginationSchema>;

const VN_PHONE_CODE = '84';
export const zNumericString = z.string().regex(/^\d+$/);

export const SUPPORTED_PHONE_CODES = [VN_PHONE_CODE];
export const ZPhoneSchema = z
  .object({
    phoneCode: zNumericString,
    phoneNumber: zNumericString,
  })
  .refine((data) => SUPPORTED_PHONE_CODES.includes(data.phoneCode), 'Phone code is not supported.');

export const ZPassword = z.string().trim().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/);
