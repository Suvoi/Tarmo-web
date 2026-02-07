import type { components } from "@/lib/api/types.gen"
import { logger } from "@/lib/logger"
import { generateMockRecipes } from "./recipes-mock"

type Schema = components["schemas"]
export type Recipe = Schema["RecipeJSONResponseDTO"]
export type RecipeListItem = Schema["RecipeListJSONResponseDTO"]
export type CreateRecipeRequest = Schema["CreateRecipeRequestDTO"]
export type UpdateRecipeRequest = Schema["UpdateRecipeRequestDTO"]

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9136"
const mode = process.env.NEXT_PUBLIC_API_MODE ?? "real"

const headers = { "Content-Type": "application/json" }

export async function getRecipes(): Promise<RecipeListItem[]> {
    logger.info("getRecipes: start", { mode })
    if (mode === "mock") return generateMockRecipes()

    try {
        const res = await fetch(`${API_URL}/recipes`, {
            cache: "no-store",
            headers,
        })
        if (!res.ok) throw new Error("Could not connect to the API")
        return await res.json()
    } catch (error) {
        logger.error("getRecipes: failed", error)
        throw error
    }
}

export async function getRecipe(id: number): Promise<Recipe | null> {
    logger.info("getRecipe: start", { id, mode })
    if (mode === "mock") {
        return generateMockRecipes().find(r => r.id === Number(id)) || null
    }

    try {
        const res = await fetch(`${API_URL}/recipes/${id}`, {
            cache: "no-store",
            headers,
        })
        if (res.status === 404) return null
        if (!res.ok) throw new Error("Could not connect to the API")
        return await res.json()
    } catch (error) {
        logger.error("getRecipe: failed", { id, error })
        return null
    }
}

export async function createRecipe(recipe: CreateRecipeRequest) {
    logger.info("createRecipe: start", { mode })
    if (mode === "mock") return

    try {
        const res = await fetch(`${API_URL}/recipes`, {
            method: "POST",
            headers,
            body: JSON.stringify(recipe),
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Could not create recipe")
        logger.info("createRecipe: success")
    } catch (error) {
        logger.error("createRecipe: failed", { recipe, error })
        throw error
    }
}

export async function updateRecipe(id: number, recipe: UpdateRecipeRequest) {
    logger.info("updateRecipe: start", { id, mode })
    if (mode === "mock") return

    try {
        const res = await fetch(`${API_URL}/recipes/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(recipe),
            cache: "no-store",
        })
        if (res.status === 404) throw new Error("Recipe not found")
        if (!res.ok) throw new Error("Could not update recipe")
        logger.info("updateRecipe: success", { id })
    } catch (error) {
        logger.error("updateRecipe: failed", { id, recipe, error })
        throw error
    }
}

export async function deleteRecipe(id: number) {
    logger.info("deleteRecipe: start", { id })
    try {
        const res = await fetch(`${API_URL}/recipes/${id}`, {
            method: "DELETE",
            headers,
            cache: "no-store",
        })
        if (res.status === 404) throw new Error("Recipe not found")
        if (!res.ok) throw new Error("Failed to delete recipe")
        logger.info("deleteRecipe: success", { id })
    } catch (error) {
        logger.error("deleteRecipe: failed", { id, error })
        throw error
    }
}
