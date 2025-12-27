import { Recipe, recipeSchema } from "@/shared/schemas/recipe"

const API_URL = "http://localhost:9136/"

const mode = process.env.NEXT_PUBLIC_API_MODE ?? "real"

function generateMockRecipes(count = 47): Recipe[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Recipe ${i + 1}`,
    description: "Generic recipe description",
    steps: [],
    quantity: 1,
    unit: "unit",
    difficulty: "easy",
    img_url: `https://picsum.photos/seed/recipe-${i + 1}/400/300`,
  }))
}

export async function getRecipes(): Promise<Recipe[]> {
  if (mode === "mock") {
    return recipeSchema.array().parse(generateMockRecipes())
  }

  try {
    const res = await fetch(`${API_URL}/recipes`, { cache: "no-store" })
    if (!res.ok) throw new Error("Could not connect to the API")
    const data = await res.json()
    return recipeSchema.array().parse(data)
  } catch {
    return recipeSchema.array().parse([])
  }
}