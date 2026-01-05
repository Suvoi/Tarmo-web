import { RecipeDetailView } from "@/components/recipes/RecipeDetailView"
import { recipeSchema } from "@/shared/schemas/recipe"
import { useRecipeFormStore } from "@/store/recipe-form-store"

export function OverviewStage() {
    const formData = useRecipeFormStore((state) => state.formData)

    const validRecipe = recipeSchema.parse(formData)
    
    return (
        <RecipeDetailView recipe={validRecipe}/>
    )
}