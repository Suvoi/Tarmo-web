import { logger } from "@/lib/logger"
import type { Template } from "./templates-api"

export function generateMockTemplates(count = 7): Template[] {
    logger.debug("generateMockTemplates", { count })

    const templates = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Template ${i + 1}`,
        description: "Generic template description",
        steps: [{ name: "Step", instructions: "do whatever bro" }],
        quantity: 1,
        unit: "Pieces",
        difficulty: 2,
        img_url: `https://picsum.photos/seed/template-${i + 1}/400/300`,
    }))

    logger.debug("generateMockTemplates: generated templates", templates)
    return templates
}
