import { z } from 'zod'

export const resourceSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional().nullable(),
    price: z.number().min(0),
})