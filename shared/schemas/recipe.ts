import { z } from 'zod'
import { stepFormSchema } from './step'

export const recipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  steps: z.array(stepFormSchema),
  quantity: z.number().min(0),
  unit: z.string(),
  difficulty: z.string(),
  img_url: z.url(),
})

export type Recipe = z.infer<typeof recipeSchema>
