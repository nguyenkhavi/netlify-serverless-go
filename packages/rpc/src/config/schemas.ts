import { z } from 'zod';

export const page = z.coerce.number().min(1).catch(1);
export const size = z.coerce.number().min(1).catch(10);

export const paginationSchema = z.object({ page, size });
export type TPaginationInput = z.infer<typeof paginationSchema>;
