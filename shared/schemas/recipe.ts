import { z } from "zod"

export const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.string(),
  unit: z.string(),
  price: z.string().optional(),
  currency: z.string().optional(),
  time: z.string().optional(),
  difficulty: z.string(),
  img_url: z.string().optional(),
})

export type Recipe = z.infer<typeof recipeSchema>
