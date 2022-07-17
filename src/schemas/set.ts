import * as z from "zod"
import { CompleteSessionItem, RelatedSessionItemModel } from "./index"

export const SetModel = z.object({
  id: z.number().int(),
  repetitions: z.number().int(),
  weightOrMinutes: z.number(),
  sessionItemId: z.number().int(),
})

export interface CompleteSet extends z.infer<typeof SetModel> {
  sessionItem: CompleteSessionItem
}

/**
 * RelatedSetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSetModel: z.ZodSchema<CompleteSet> = z.lazy(() => SetModel.extend({
  sessionItem: RelatedSessionItemModel,
}))
