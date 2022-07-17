import * as z from "zod"
import { CompleteSessionEntry, RelatedSessionEntryModel } from "./index"

export const SetModel = z.object({
  id: z.number().int(),
  repetitions: z.number().int(),
  weightOrMinutes: z.number(),
  sessionEntryId: z.number().int(),
})

export interface CompleteSet extends z.infer<typeof SetModel> {
  sessionEntry: CompleteSessionEntry
}

/**
 * RelatedSetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSetModel: z.ZodSchema<CompleteSet> = z.lazy(() => SetModel.extend({
  sessionEntry: RelatedSessionEntryModel,
}))
