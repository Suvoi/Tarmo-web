import { Recipe, RecipeListItem, recipeListItemSchema, RecipeWithId, recipeWithIdSchema } from "@/shared/schemas/recipe"
import { logger } from "../logger"

const API_URL = "http://localhost:9136"
const mode = process.env.NEXT_PUBLIC_API_MODE ?? "real"

function generateMockRecipes(count = 7): RecipeWithId[] {
  logger.debug("generateMockRecipes", { count })

  const recipes = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Recipe ${i + 1}`,
    description: "Generic recipe description",
    steps: [{ name: "Step", instructions: "do whatever bro" }],
    quantity: 1,
    unit: "Pieces",
    difficulty: "Easy",
    img_url: `https://picsum.photos/seed/recipe-${i + 1}/400/300`,
  }))

  logger.debug("generateMockRecipes: generated recipes", recipes)
  return recipes
}

export async function getRecipes(): Promise<RecipeListItem[]> {
  logger.info("getRecipes: start", { mode })
  if (mode === "mock") {
    const mock = generateMockRecipes()
    logger.debug("getRecipes: mock data", mock)
    return recipeListItemSchema.array().parse(mock)
  }
  try {
    const res = await fetch(`${API_URL}/recipes`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    })
    logger.debug("getRecipes: response", { status: res.status, ok: res.ok })
    if (!res.ok) {
      logger.warn("getRecipes: non-ok response", { status: res.status })
      throw new Error("Could not connect to the API")
    }
    const data = await res.json()
    logger.debug("getRecipes: raw data", data)
    const parsed = recipeListItemSchema.array().parse(data)
    logger.debug("getRecipes: parsed recipes", parsed)
    return parsed
  } catch (error) {
    logger.error("getRecipes: failed", error)
    throw error
  }
}

export async function getRecipe(id: string): Promise<RecipeWithId | null> {
  logger.info("getRecipe: start", { id, mode })

  if (mode === "mock") {
    const mockRecipes = generateMockRecipes()
    const recipe = mockRecipes.find(r => r.id === Number(id))
    logger.debug("getRecipe: mock data", recipe)
    return recipe ? recipeWithIdSchema.parse(recipe) : null
  }

  try {
    const res = await fetch(`${API_URL}/recipes/${id}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    })

    logger.debug("getRecipe: response", { status: res.status })

    if (res.status === 404) {
      logger.warn("getRecipe: recipe not found", { id })
      return null
    }

    if (!res.ok) {
      logger.error("getRecipe: API error", { status: res.status })
      throw new Error("Could not connect to the API")
    }

    const data = await res.json()
    logger.debug("getRecipe: raw recipe data", data)

    const parsed = recipeWithIdSchema.parse(data)
    logger.debug("getRecipe: parsed recipe", parsed)

    return parsed
  } catch (error) {
    logger.error("getRecipe: failed", { id, error })
    return null
  }
}

export async function createRecipe(recipe: Recipe) {
  logger.info("createRecipe: start", { mode })
  logger.debug("createRecipe: recipe object", recipe)

  if (mode === "mock") {
    return
  }

  try {
    const res = await fetch(`${API_URL}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
      cache: "no-store",
    })

    logger.debug("createRecipe: response", { status: res.status })

    if (!res.ok) {
      logger.warn("createRecipe: failed response", { status: res.status, recipe })
      throw new Error("Could not create recipe")
    }

    logger.info("createRecipe: success", { recipe })
  } catch (error) {
    logger.error("createRecipe: failed", { recipe, error })
    throw error
  }
}

export async function deleteRecipe(id: string) {
  logger.info("deleteRecipe: start", { id })

  try {
    const res = await fetch(`${API_URL}/recipes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    logger.debug("deleteRecipe: response", { status: res.status })

    if (res.status === 404) {
      logger.warn("deleteRecipe: recipe not found", { id })
      throw new Error("Recipe not found")
    }

    if (!res.ok) {
      logger.warn("deleteRecipe: failed response", { status: res.status, id })
      throw new Error("Failed to delete recipe")
    }

    logger.info("deleteRecipe: success", { id })
  } catch (error) {
    logger.error("deleteRecipe: failed", { id, error })
    throw error
  }
}
