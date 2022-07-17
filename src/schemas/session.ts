import * as z from 'zod';
import { CompleteSessionItem, RelatedSessionItemModel } from './index';

export const SessionModel = z.object({
  id: z.number().int(),
  date: z.date(),
});

export interface CompleteSession extends z.infer<typeof SessionModel> {
  SessionItem: CompleteSessionItem[];
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() =>
  SessionModel.extend({
    SessionItem: RelatedSessionItemModel.array(),
  }),
);
