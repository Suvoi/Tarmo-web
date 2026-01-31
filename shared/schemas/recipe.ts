import { z } from 'zod'
import { stepSchema } from './step'

export const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  steps: z.array(stepSchema).min(1),
  quantity: z.number().min(1),
  unit: z.string(),
  difficulty: z.number().min(1).max(5),
  img_url: z.string().url().optional().nullable(),
})

export const recipeWithIdSchema = recipeSchema.extend({
  id: z.number(),
})

export const recipeListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
})

export type Recipe = z.infer<typeof recipeSchema>
export type RecipeWithId = z.infer<typeof recipeWithIdSchema>
export type RecipeListItem = z.infer<typeof recipeListItemSchema>