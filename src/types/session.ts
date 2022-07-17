import { z } from 'zod';
import { RelatedSessionEntryModel, SessionModel } from '~/schemas';

export type Session = z.infer<typeof SessionModel>;

export type SessionEntry = z.infer<typeof RelatedSessionEntryModel>;
