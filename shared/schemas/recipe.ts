import { z } from 'zod'
import { stepSchema } from './step'

export const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  steps: z.array(stepSchema),
  quantity: z.number().min(1),
  unit: z.string(),
  difficulty: z.string(),
  img_url: z.string().url().optional(),
})

export const recipeWithIdSchema = recipeSchema.extend({
  id: z.number(),
})

export type Recipe = z.infer<typeof recipeSchema>
export type RecipeWithId = z.infer<typeof recipeWithIdSchema>