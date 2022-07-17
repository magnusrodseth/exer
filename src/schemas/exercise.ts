import * as z from 'zod';
import { MuscleGroup, Motion } from '@prisma/client';
import { CompleteSessionEntry, RelatedSessionEntryModel } from './index';

export const ExerciseModel = z.object({
  id: z.number().int(),
  name: z.string(),
  muscleGroups: z.nativeEnum(MuscleGroup).array(),
  motion: z.nativeEnum(Motion),
});

export interface CompleteExercise extends z.infer<typeof ExerciseModel> {
  SessionEntry: CompleteSessionEntry[];
}

/**
 * RelatedExerciseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedExerciseModel: z.ZodSchema<CompleteExercise> = z.lazy(() =>
  ExerciseModel.extend({
    SessionEntry: RelatedSessionEntryModel.array(),
  }),
);
