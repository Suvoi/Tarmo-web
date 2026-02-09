import { z } from 'zod'
import { stepSchema } from './step'

export const templateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  steps: z.array(stepSchema).min(1),
  quantity: z.number().min(1),
  unit: z.string(),
  difficulty: z.number().min(0).max(5).default(0),
  img_url: z.string().url().optional().nullable(),
})

export const templateWithIdSchema = templateSchema.extend({
  id: z.number(),
})

export const templateListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
})

export type Template = z.infer<typeof templateSchema>
export type TemplateWithId = z.infer<typeof templateWithIdSchema>
export type TemplateListItem = z.infer<typeof templateListItemSchema>