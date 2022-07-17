import { z } from 'zod';

export const AddSessionSchema = z.object({
  date: z.date(),
});
