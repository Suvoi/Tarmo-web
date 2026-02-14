import { z } from "zod"

export const StepSchema = z.object({
    name: z.string().min(1).trim(),
    instructions: z.string().nullable(),
})

export type Step = z.infer<typeof StepSchema>
