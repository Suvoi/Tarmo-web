import { Recipe, RecipeWithId, recipeWithIdSchema } from "@/shared/schemas/recipe"

const API_URL = "http://localhost:9136"

const mode = process.env.NEXT_PUBLIC_API_MODE ?? "real"

function generateMockRecipes(count = 0): Recipe[] {
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

export async function getRecipes(): Promise<RecipeWithId[]> {
  if (mode === "mock") {
    return recipeWithIdSchema.array().parse(generateMockRecipes())
  }
  try {
    const res = await fetch(`${API_URL}/recipes/`, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Response status:', res.status)
    console.log('Response ok:', res.ok)
    
    if (!res.ok) throw new Error("Could not connect to the API")
    
    const data = await res.json()
    console.log('Raw data from API:', data)
    
    const parsed = recipeWithIdSchema.array().parse(data)
    console.log('Parsed data:', parsed)
    
    return parsed
  } catch (error) {
    console.error('Error in getRecipes:', error)
    return recipeWithIdSchema.array().parse([])
  }
}

export async function createRecipe(recipe: Recipe) {
  if (mode === "mock") {
    console.log(`MOCK MODE, DEBUG: ${recipe}`)
  }

  try {
    const res = await fetch(`${API_URL}/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Could not create recipe")
    }

  } catch (error) {
    throw new Error("Failed to create recipe")
  }
}