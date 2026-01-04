import { z } from 'zod'

export const stepSchema = z.object({
  name: z.string().min(1),
  instructions: z.string().optional().default(""),
})

export type Step = z.infer<typeof stepSchema>