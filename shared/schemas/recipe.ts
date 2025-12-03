import { z } from "zod"

export const recipeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().optional(),
  instructions: z.string(),
  quantity: z.number().min(0),
  unit: z.string(),
  difficulty: z.string(),
  img_url: z.string().optional(),
})

export type Recipe = z.infer<typeof recipeSchema>
