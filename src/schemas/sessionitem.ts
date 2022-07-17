import * as z from "zod"
import { CompleteExercise, RelatedExerciseModel, CompleteSession, RelatedSessionModel, CompleteSet, RelatedSetModel } from "./index"

export const SessionItemModel = z.object({
  id: z.number().int(),
  exerciseId: z.number().int(),
  sessionId: z.number().int(),
})

export interface CompleteSessionItem extends z.infer<typeof SessionItemModel> {
  exercise: CompleteExercise
  session: CompleteSession
  sets: CompleteSet[]
}

/**
 * RelatedSessionItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionItemModel: z.ZodSchema<CompleteSessionItem> = z.lazy(() => SessionItemModel.extend({
  exercise: RelatedExerciseModel,
  session: RelatedSessionModel,
  sets: RelatedSetModel.array(),
}))
