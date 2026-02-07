"use client"

import { RecipeFormWrapper } from "@/app/recipes/new/components/RecipeFormWrapper"
import { useRecipeFormStore } from "@/features/recipes/store/recipe-form-store"
import { useEffect } from "react"
import type { Recipe } from "@/features/recipes/api"

interface EditRecipeClientProps {
    recipeId: number
    recipe: Recipe
}

export function EditRecipeClient({ recipeId, recipe }: EditRecipeClientProps) {
    const { initializeForEdit } = useRecipeFormStore()

    useEffect(() => {
        if (recipe) {
            initializeForEdit(recipeId, recipe)
        }
    }, [recipeId, recipe, initializeForEdit])

    return <RecipeFormWrapper mode="edit" recipeId={recipeId} />
}
