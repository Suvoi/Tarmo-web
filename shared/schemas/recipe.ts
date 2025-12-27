import { z } from 'zod'
import { stepSchema, stepFormSchema } from './step'

export const recipeFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  steps: z.array(stepFormSchema),
  quantity: z.number().min(0),
  unit: z.string(),
  difficulty: z.string(),
  img_url: z.string().url(),
})

export const recipeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().optional(),
  steps: z.array(stepSchema),
  quantity: z.number().min(0),
  unit: z.string(),
  difficulty: z.string(),
  img_url: z.string().url(),
})

export type Recipe = z.infer<typeof recipeSchema>
export type RecipeForm = z.infer<typeof recipeFormSchema>
