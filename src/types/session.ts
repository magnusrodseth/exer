import { z } from 'zod';
import { SessionModel } from '~/schemas';

export type Session = z.infer<typeof SessionModel>;
