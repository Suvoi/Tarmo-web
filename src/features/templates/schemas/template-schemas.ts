import { z } from 'zod'

export const TemplateStepSchema = z.object({
    name: z.string().min(1, "Step name is required").trim(),
    instructions: z.string().optional().nullable(),
})

export const TemplateStepsSchema = z.array(TemplateStepSchema).min(1, "At least one step is required")

export const ResourceRefSchema = z.object({
    resource_id: z.number().min(1, "Resource is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unit: z.string().min(1, "Unit is required"),
})

export const TemplateResourcesSchema = z.array(ResourceRefSchema)

export const TemplateOverviewSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    description: z.string().optional().nullable(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unit: z.string().min(1, "Unit is required"),
    difficulty: z.number().min(0).max(5),
    img_url: z.string().url().optional().nullable(),
})

export type TemplateStep = z.infer<typeof TemplateStepSchema>
export type TemplateOverview = z.infer<typeof TemplateOverviewSchema>
export type ResourceRef = z.infer<typeof ResourceRefSchema>
