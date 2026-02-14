import { z } from 'zod'

export const UnitSchema = z.object({
    name: z.enum(["mg", "g", "kg", "ml", "l", "pcs"]),
})

export const QuantitySchema = z.object({
    value: z.number().positive(),
    unit: UnitSchema,
})

export type Quantity = z.infer<typeof QuantitySchema>
export type Unit = z.infer<typeof UnitSchema>