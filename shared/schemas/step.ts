import { z } from 'zod'

export const stepFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  instructions: z.string().optional(),
})

export const stepSchema = stepFormSchema.extend({
  order: z.number().int(),
})

export type FormStep = z.infer<typeof stepFormSchema>
export type Step = z.infer<typeof stepSchema>
