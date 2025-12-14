import { z } from 'zod'

export const stepSchema = z.object({
  id: z.number().optional(),
  order: z.number().min(1),
  name: z.string().min(1, 'Title is required'),
  instructions: z.string().optional(),
})

export type Step = z.infer<typeof stepSchema>
