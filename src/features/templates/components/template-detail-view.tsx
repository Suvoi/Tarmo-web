"use client"

import { Badge } from "@/components/ui/badge"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Zap, CircleQuestionMark, Flame, Skull, Scale, Croissant, Box, List } from "lucide-react"
import type { Template } from "@/features/templates/api"
import { getResources } from "@/features/resources/api/resources-api"
import useSWR from "swr"

interface TemplateDetailViewProps {
  template: Template
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const { data: resources = [] } = useSWR("/resources", getResources)

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
      default:
        return "Unknown"
    }
  }

  return (
    <div className="h-full w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 overflow-y-auto md:overflow-hidden">
      <div className="p-2 min-h-0 flex flex-col gap-6 overflow-hidden">
        <div className="space-y-3 shrink-0">
          <h2 className="text-4xl">{template.name}</h2>
          <div className="flex flex-wrap gap-2">
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
          <p className="text-base leading-relaxed text-muted-foreground">
            {template.description || "No description available"}
          </p>
        </div>

        {/* RELATED RESOURCES */}
        {template.resources && template.resources.length > 0 && (
          <div className="flex-1 flex flex-col min-h-0 gap-3">
            <h3 className="text-xl font-semibold flex items-center gap-2 shrink-0">
              <Box className="h-5 w-5" />
              Resources
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {template.resources.map((ref, index) => {
                const resource = resources.find(r => r.id === ref.resource_id)
                return (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg border bg-card shrink-0">
                    <span className="font-medium text-lg">{resource?.name || "Loading..."}</span>
                    <span className="text-muted-foreground text-lg">{ref.quantity} {ref.unit}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* STEPS */}
      <div className="space-y-3 max-h-full md:overflow-y-auto p-2 min-h-0">
        <h3 className="text-xl font-semibold flex items-center gap-2"><List className="h-5 w-5" />Steps</h3>
        {template.steps?.map((step, index) => (
          <Item key={index} size="default" className="h-auto">
            <ItemContent>
              <ItemTitle className="text-xl">
                {index + 1}. {step.name}
              </ItemTitle>
              {step.instructions && step.instructions.trim() && (
                <ItemDescription className="text-base line-clamp-none whitespace-pre-wrap">
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