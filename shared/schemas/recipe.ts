import { z } from "zod"

export const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  instructions: z.string(),
  quantity: z.string(),
  unit: z.string(),
  difficulty: z.string(),
  img_url: z.string().optional(),
})

export type Recipe = z.infer<typeof recipeSchema>
