import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Zap, CircleQuestionMark, Flame, Skull, Scale, Croissant } from "lucide-react"
import DeleteTemplateButton from "./delete-template-button"
import type { Template } from "@/features/templates/api"

interface TemplateDetailViewProps {
  template: Template
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const getDifficultyIcon = (difficulty?: number) => {
    switch (difficulty) {
      case 0:
        return <CircleQuestionMark size={16} />
      case 1:
        return <Croissant size={16} />
      case 2:
        return <Zap size={16} />
      case 3:
        return <Scale size={16} />
      case 4:
        return <Flame size={16} />
      case 5:
        return <Skull size={16} />
      default:
        return <CircleQuestionMark size={16} />
    }
  }

  const getDifficulty = (difficulty?: number) => {
    switch (difficulty) {
      case 0:
        return "Not Specified"
      case 1:
        return "Very Easy"
      case 2:
        return "Easy"
      case 3:
        return "Medium"
      case 4:
        return "Hard"
      case 5:
        return "Very Hard"
    }
  }

  return (
    <div className="h-full w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="space-y-3 p-2">
        <h2 className="text-4xl mb-6">{template.name}</h2>
        <div className="flex space-x-2">
          {template.quantity && template.unit && (
            <Badge className="text-base">
              {template.quantity} {template.unit}
            </Badge>
          )}
          {template.difficulty !== undefined && template.difficulty !== null && (
            <Badge className="text-base flex items-center gap-1">
              {getDifficultyIcon(template.difficulty)}
              {getDifficulty(template.difficulty)}
            </Badge>
          )}
        </div>
        <p className="text-base leading-relaxed">
          {template.description || "No description available"}
        </p>
      </div>
      <div className="space-y-2 max-h-full lg:overflow-y-auto p-2">
        {template.steps?.map((step, index) => (
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