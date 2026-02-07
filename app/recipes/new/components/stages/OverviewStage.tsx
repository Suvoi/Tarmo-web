import { RecipeDetailView } from "@/features/recipes/components/recipe-detail-view"
import { useRecipeFormStore } from "@/features/recipes/store/recipe-form-store"

export function OverviewStage() {
    const { getRecipeData } = useRecipeFormStore()

    const validRecipe = getRecipeData()

    return (
        <RecipeDetailView recipe={validRecipe} />
    )
}