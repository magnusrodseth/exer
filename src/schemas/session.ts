import * as z from "zod"
import { CompleteSessionEntry, RelatedSessionEntryModel } from "./index"

export const SessionModel = z.object({
  id: z.number().int(),
  date: z.date(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  SessionEntry: CompleteSessionEntry[]
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  SessionEntry: RelatedSessionEntryModel.array(),
}))
