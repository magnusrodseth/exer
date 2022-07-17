import { z } from 'zod';
import { AddSessionSchema } from '~/schemas/forms';

export type AddSession = z.infer<typeof AddSessionSchema>;
