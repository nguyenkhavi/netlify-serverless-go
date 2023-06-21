//THIRD PARTY MODULES
import * as z from 'zod';

export const phoneNumberSchema = z
  .string()
  .nonempty({ message: 'Phone number is required' })
  .min(3, { message: 'Invalid Phone Number' })
  .max(15, { message: 'Invalid Phone Number' });
