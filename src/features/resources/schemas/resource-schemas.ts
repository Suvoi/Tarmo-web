import { z } from 'zod'
import { QuantitySchema } from '../../shared/schemas/quantity-schemas'

export const resourceSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number().positive(),
    quantity: QuantitySchema
})

export type Resource = z.infer<typeof resourceSchema>