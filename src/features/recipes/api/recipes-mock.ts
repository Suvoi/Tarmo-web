import { logger } from "@/lib/logger"
import type { Recipe } from "./recipes-api"

export function generateMockRecipes(count = 7): Recipe[] {
    logger.debug("generateMockRecipes", { count })

    const recipes = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Recipe ${i + 1}`,
        description: "Generic recipe description",
        steps: [{ name: "Step", instructions: "do whatever bro" }],
        quantity: 1,
        unit: "Pieces",
        difficulty: 2,
        img_url: `https://picsum.photos/seed/recipe-${i + 1}/400/300`,
    }))

    logger.debug("generateMockRecipes: generated recipes", recipes)
    return recipes
}
