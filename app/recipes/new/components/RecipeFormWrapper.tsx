"use client"

import { useRecipeFormStore } from "@/store/recipe-form-store"
import { MetadataStage } from "./stages/MetadataStage"
import { StepsStage } from "./stages/StepsStage"
import { OverviewStage } from "./stages/OverviewStage"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createRecipe } from "@/lib/api/recipes"
import { toast } from "sonner"
import { mutate } from "swr"

const STAGES = [
  { id: 0, name: "General", component: MetadataStage },
  { id: 1, name: "Steps", component: StepsStage },
  { id: 2, name: "Overview", component: OverviewStage },
]

export function RecipeFormWrapper() {
  const { currentStage, setCurrentStage, canGoToStage, resetForm, getRecipeData } = useRecipeFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const CurrentStageComponent = STAGES[currentStage].component
  const progress = ((currentStage + 1) / STAGES.length) * 100
  const isLastStage = currentStage === STAGES.length - 1
  
  const router = useRouter()
  
  const handleNext = () => {
    if (currentStage < STAGES.length - 1 && canGoToStage(currentStage + 1)) {
      setCurrentStage(currentStage + 1)
    }
  }
  
  const handleBack = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1)
    }
  }

  const handleCreate = async () => {
    setIsSubmitting(true)
    try {
      const recipeData = getRecipeData()
      await createRecipe(recipeData)
      router.push("/recipes")
      mutate("/recipes")
      resetForm()
      toast.success("Recipe added to your collection!")
    } catch (error) {
      console.error("Error creating recipe:", error)
      toast.error("Oops! Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      <div className="px-4 space-y-2 pb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{currentStage + 1} / {STAGES.length}</span>  {/* ← cambio */}
          <span className="text-muted-foreground">{STAGES[currentStage].name}</span>  {/* ← cambio */}
        </div>
        <Progress value={progress} />
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 flex items-center justify-center">
        <CurrentStageComponent />
      </div>
      
      <div className="flex items-center justify-between px-4 py-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStage === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {isLastStage ? (
          <Button
            onClick={handleCreate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Recipe"}
            <Check className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canGoToStage(currentStage + 1)}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

      </div>
    </div>
  )
}