import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Flame, Coffee, Zap, ChartNoAxesColumn } from "lucide-react"
import { Recipe, RecipeWithId } from "@/shared/schemas/recipe"

interface RecipeDetailViewProps {
  recipe: Recipe | RecipeWithId
}

export function RecipeDetailView({ recipe }: RecipeDetailViewProps) {
  const getDifficultyIcon = (difficulty?: string) => {
    switch (difficulty) {
      case "Easy":
        return <Zap size={16} />
      case "Medium":
        return <Coffee size={16} />
      case "Hard":
        return <Flame size={16} />
      default:
        return <ChartNoAxesColumn size={16} />
    }
  }

  return (
    <div className="h-full w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="space-y-3 p-2">
        <h2 className="text-4xl mb-6">{recipe.name}</h2>
        <div className="flex space-x-2">
          {recipe.quantity && recipe.unit && (
            <Badge className="text-base">
              {recipe.quantity} {recipe.unit}
            </Badge>
          )}
          {recipe.difficulty && (
            <Badge className="text-base flex items-center gap-1">
              {getDifficultyIcon(recipe.difficulty)}
              {recipe.difficulty}
            </Badge>
          )}
        </div>
        <p className="text-base leading-relaxed">
          {recipe.description || "No description available"}
        </p>
      </div>
      <div className="space-y-2 max-h-full lg:overflow-y-auto p-2">
        {recipe.steps.map((step, index) => (
          <Item key={index} size="default" className="h-auto">
            <ItemContent>
              <ItemTitle className="text-xl">
                {index + 1}. {step.name}
              </ItemTitle>
              {step.instructions && step.instructions.trim() && (
                <ItemDescription className="text-base line-clamp-none">
                  {step.instructions}
                </ItemDescription>
              )}
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  )
}