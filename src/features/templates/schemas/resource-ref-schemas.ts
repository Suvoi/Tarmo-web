import { z } from "zod"
import type { components } from '@/lib/api/types.gen'

// OpenAPI generated type
type Schema = components['schemas']
export type ResourceRefResponse = Schema['ResourceRefResponseDTO']

// Zod schema for validation (matches the OpenAPI structure)
export const ResourceRefSchema = z.object({
    resource_id: z.number().positive('Resource ID must be positive'),
    quantity: z.number().positive('Quantity must be positive'),
    unit: z.string().min(1, 'Unit is required')
})

export type ResourceRef = z.infer<typeof ResourceRefSchema>