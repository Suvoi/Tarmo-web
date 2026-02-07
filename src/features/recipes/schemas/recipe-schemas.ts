import { z } from 'zod'

export const RecipeStepSchema = z.object({
    name: z.string().min(1, "Step name is required").trim(),
    instructions: z.string().optional().nullable(),
})

export const RecipeStepsSchema = z.array(RecipeStepSchema).min(1, "At least one step is required")

export const RecipeOverviewSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    description: z.string().optional().nullable(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unit: z.string().min(1, "Unit is required"),
    difficulty: z.number().min(0).max(5),
    img_url: z.string().url().optional().nullable(),
})

export type RecipeStep = z.infer<typeof RecipeStepSchema>
export type RecipeOverview = z.infer<typeof RecipeOverviewSchema>
