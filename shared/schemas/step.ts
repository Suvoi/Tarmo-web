import { z } from 'zod'

export const stepFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  instructions: z.string().optional(),
})

export type FormStep = z.infer<typeof stepFormSchema>
