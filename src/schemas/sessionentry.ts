import * as z from 'zod';
import {
  CompleteExercise,
  RelatedExerciseModel,
  CompleteSession,
  RelatedSessionModel,
  CompleteSet,
  RelatedSetModel,
} from './index';

export const SessionEntryModel = z.object({
  id: z.number().int(),
  exerciseId: z.number().int(),
  sessionId: z.number().int(),
});

export interface CompleteSessionEntry
  extends z.infer<typeof SessionEntryModel> {
  exercise: CompleteExercise;
  session: CompleteSession;
  sets: CompleteSet[];
}

/**
 * RelatedSessionEntryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionEntryModel: z.ZodSchema<CompleteSessionEntry> =
  z.lazy(() =>
    SessionEntryModel.extend({
      exercise: RelatedExerciseModel,
      session: RelatedSessionModel,
      sets: RelatedSetModel.array(),
    }),
  );
